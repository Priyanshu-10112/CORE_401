"use client";

import { useAuthStore } from "@/lib/auth-store";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";

export default function AuthTestPage() {
    const { user, isAuthenticated, isInitialized, logout, validateToken, initialize } = useAuthStore();
    const { items, userId, clearCart } = useCartStore();

    return (
        <div className="min-h-screen p-8 bg-slate-50">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Authentication & Cart Debug</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Auth State */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Auth State</h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>Initialized:</strong> {isInitialized ? "Yes" : "No"}</p>
                            <p><strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}</p>
                            <p><strong>User ID:</strong> {user?.id || "None"}</p>
                            <p><strong>User Name:</strong> {user?.name || "None"}</p>
                            <p><strong>User Role:</strong> {user?.role || "None"}</p>
                            <p><strong>User Email:</strong> {user?.email || "None"}</p>
                        </div>
                        
                        <div className="mt-4 space-x-2">
                            <Button 
                                onClick={initialize}
                                variant="outline"
                                size="sm"
                            >
                                Initialize
                            </Button>
                            <Button 
                                onClick={() => {
                                    const isValid = validateToken();
                                    alert(`Token valid: ${isValid}`);
                                }}
                                variant="outline"
                                size="sm"
                            >
                                Validate Token
                            </Button>
                            <Button 
                                onClick={logout}
                                variant="destructive"
                                size="sm"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>

                    {/* Cart State */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Cart State</h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>Cart User ID:</strong> {userId || "None"}</p>
                            <p><strong>Items Count:</strong> {items.length}</p>
                            <p><strong>Items:</strong></p>
                            <ul className="ml-4 list-disc">
                                {items.map((item, index) => (
                                    <li key={index}>{item.name} (x{item.quantity})</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mt-4">
                            <Button 
                                onClick={clearCart}
                                variant="outline"
                                size="sm"
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Storage Debug */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Storage Debug</h2>
                    <div className="space-y-2 text-sm">
                        <p><strong>LocalStorage Auth:</strong> {typeof window !== 'undefined' ? localStorage.getItem('pharmacy-auth-storage') : 'N/A'}</p>
                        <p><strong>SessionStorage Cart:</strong> {typeof window !== 'undefined' ? sessionStorage.getItem('pharmacy-cart-storage') : 'N/A'}</p>
                    </div>
                    
                    <div className="mt-4 space-x-2">
                        <Button 
                            onClick={() => {
                                localStorage.clear();
                                sessionStorage.clear();
                                window.location.reload();
                            }}
                            variant="destructive"
                            size="sm"
                        >
                            Clear All Storage & Reload
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}