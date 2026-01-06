"use client";

import { useAuthStore } from "@/lib/auth-store";
import { useStoreApplication } from "@/hooks/use-store-application";

export default function AdminDebugPage() {
    console.log("🔥 Admin Debug Page - Rendering");
    
    const { user, isAuthenticated, isInitialized } = useAuthStore();
    const { data: applicationStatus, isLoading: statusLoading, error } = useStoreApplication();

    console.log("🔥 Admin Debug Page - State:", {
        isAuthenticated,
        isInitialized,
        userRole: user?.role,
        statusLoading,
        applicationStatus: applicationStatus?.storeStatus
    });

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">🔥 Admin Debug Page - Layout Working!</h1>
            
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">Auth State</h2>
                    <pre className="text-sm bg-gray-100 p-2 rounded">
                        {JSON.stringify({
                            isAuthenticated,
                            isInitialized,
                            user: user ? {
                                id: user.id,
                                name: user.name,
                                role: user.role,
                                email: user.email
                            } : null
                        }, null, 2)}
                    </pre>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">Store Application Status</h2>
                    <p><strong>Loading:</strong> {statusLoading ? "Yes" : "No"}</p>
                    <p><strong>Error:</strong> {error ? error.message : "None"}</p>
                    <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
                        {JSON.stringify(applicationStatus, null, 2)}
                    </pre>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">Local Storage</h2>
                    <p><strong>auth-token:</strong> {typeof window !== 'undefined' ? (localStorage.getItem('auth-token') ? 'Present' : 'Missing') : 'N/A'}</p>
                    <p><strong>pharmacy-auth-storage:</strong> {typeof window !== 'undefined' ? (localStorage.getItem('pharmacy-auth-storage') ? 'Present' : 'Missing') : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}