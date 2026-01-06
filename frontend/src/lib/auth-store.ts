import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthStore {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    clearAuth: () => void;
    validateToken: () => boolean;
    initialize: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isInitialized: false,
            
            initialize: () => {
                const { token, isAuthenticated } = get();
                console.log("Auth Store - Initialize:", { hasToken: !!token, isAuthenticated });
                
                if (isAuthenticated && token) {
                    // Ensure token is available for API client
                    if (typeof window !== "undefined") {
                        localStorage.setItem("auth-token", token);
                    }
                    
                    // Validate existing token
                    const isValid = get().validateToken();
                    if (!isValid) {
                        get().clearAuth();
                    }
                }
                
                set({ isInitialized: true });
            },
            
            login: (user, token) => {
                console.log("Auth Store - Login:", { userId: user.id, userName: user.name });
                set({ 
                    user, 
                    token, 
                    isAuthenticated: true,
                    isInitialized: true 
                });
                
                // Also save token for API client
                if (typeof window !== "undefined") {
                    localStorage.setItem("auth-token", token);
                }
            },
            
            logout: () => {
                console.log("Auth Store - Logout");
                set({ 
                    user: null, 
                    token: null, 
                    isAuthenticated: false,
                    isInitialized: true 
                });
                
                // Clear storage
                if (typeof window !== "undefined") {
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("pharmacy-auth-storage");
                    sessionStorage.removeItem("pharmacy-cart-storage");
                }
            },
            
            clearAuth: () => {
                console.log("Auth Store - Clear Auth");
                set({ 
                    user: null, 
                    token: null, 
                    isAuthenticated: false,
                    isInitialized: true 
                });
                
                if (typeof window !== "undefined") {
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("pharmacy-auth-storage");
                    sessionStorage.removeItem("pharmacy-cart-storage");
                }
            },
            
            validateToken: () => {
                const { token, isAuthenticated } = get();
                
                // If not authenticated, no need to validate
                if (!isAuthenticated || !token) {
                    return false;
                }
                
                try {
                    // Basic JWT validation - check if token is expired
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const currentTime = Date.now() / 1000;
                    
                    if (payload.exp && payload.exp < currentTime) {
                        console.log("Auth Store - Token expired");
                        return false;
                    }
                    
                    return true;
                } catch (error) {
                    console.log("Auth Store - Invalid token format");
                    return false;
                }
            },
        }),
        {
            name: "pharmacy-auth-storage",
            storage: {
                getItem: (name) => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);
