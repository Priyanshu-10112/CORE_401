import axios from "axios";

// Create an axios instance with base configuration
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor for JWT if needed
apiClient.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
        const authData = typeof window !== "undefined" ? localStorage.getItem("pharmacy-auth-storage") : null;
        
        console.log("API Client - Request interceptor:", { 
            url: config.url, 
            hasToken: !!token,
            tokenPreview: token ? `${token.substring(0, 20)}...` : null
        });
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add role header for backend role guard
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                const userRole = parsed.state?.user?.role;
                if (userRole) {
                    config.headers['x-role'] = userRole;
                }
            } catch (error) {
                console.error("Failed to parse auth data for role header:", error);
            }
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("API Client - Response error:", {
            status: error.response?.status,
            url: error.config?.url,
            message: error.response?.data?.message || error.message
        });
        
        // Handle unauthorized errors (e.g., redirect to login)
        if (error.response?.status === 401) {
            console.log("API Client - 401 Unauthorized, clearing auth token");
            if (typeof window !== "undefined") {
                localStorage.removeItem("auth-token");
                // Optional: window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
