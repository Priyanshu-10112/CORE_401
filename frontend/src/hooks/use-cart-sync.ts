import { useEffect } from 'react';
import { useAuthStore } from '@/lib/auth-store';
import { useCartStore } from '@/lib/cart-store';

/**
 * Hook to sync cart with user authentication
 * Clears cart when user changes or logs out
 */
export function useCartSync() {
    const { user, isAuthenticated, isInitialized } = useAuthStore();
    const { setUser, clearCart } = useCartStore();

    useEffect(() => {
        // Only sync after auth is initialized
        if (!isInitialized) return;
        
        console.log("Cart Sync - Auth State:", { 
            isAuthenticated, 
            userId: user?.id,
            userName: user?.name,
            isInitialized
        });
        
        if (isAuthenticated && user) {
            // Set current user in cart
            setUser(user.id);
        } else {
            // User logged out or not authenticated
            setUser(null);
            // Only clear cart if we're initialized and not authenticated
            if (isInitialized && !isAuthenticated) {
                console.log("Cart Sync - Clearing cart due to logout");
                clearCart();
            }
        }
    }, [isAuthenticated, isInitialized, user?.id, setUser, clearCart]);
}