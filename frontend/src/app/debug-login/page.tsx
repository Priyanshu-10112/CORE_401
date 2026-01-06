"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DebugLoginPage() {
    const [email, setEmail] = useState("pappu@p.com");
    const [password, setPassword] = useState("password123");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testDirectAPI = async () => {
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            console.log("Testing direct API call...");
            console.log("Sending credentials:", { email, password: password.substring(0, 3) + "..." });
            
            const requestBody = { email, password };
            console.log("Request body:", requestBody);
            
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            console.log("Response status:", response.status);
            console.log("Response headers:", Object.fromEntries(response.headers.entries()));

            const responseText = await response.text();
            console.log("Raw response:", responseText);

            if (!response.ok) {
                console.log("Error response:", responseText);
                throw new Error(`HTTP ${response.status}: ${responseText}`);
            }

            const data = JSON.parse(responseText);
            console.log("Success response:", data);
            setResult(data);

        } catch (err: any) {
            console.error("API Error:", err);
            setError({
                message: err.message,
                stack: err.stack,
                name: err.name
            });
        } finally {
            setLoading(false);
        }
    };

    const testWithAxios = async () => {
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            console.log("Testing with axios...");
            
            const { authService } = await import("@/lib/auth-service");
            const response = await authService.login(email, password);
            
            console.log("Axios success response:", response);
            setResult(response);

        } catch (err: any) {
            console.error("Axios Error:", err);
            setError({
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                stack: err.stack
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Debug Login API</h1>
                
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold mb-4">Test Credentials</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        
                        <div className="flex gap-4">
                            <Button 
                                onClick={testDirectAPI} 
                                disabled={loading}
                                variant="outline"
                            >
                                {loading ? "Testing..." : "Test Direct Fetch"}
                            </Button>
                            
                            <Button 
                                onClick={testWithAxios} 
                                disabled={loading}
                            >
                                {loading ? "Testing..." : "Test with Axios"}
                            </Button>
                        </div>
                    </div>
                </div>

                {result && (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Success Response</h3>
                        <pre className="text-sm text-green-700 overflow-auto">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Error Response</h3>
                        <pre className="text-sm text-red-700 overflow-auto">
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}