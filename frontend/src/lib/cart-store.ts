import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Medicine, CartItem } from "@/types";

interface CartStore {
    items: CartItem[];
    userId: string | null;
    addItem: (medicine: Medicine) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    setUser: (userId: string | null) => void;
    getTotalPrice: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            userId: null,

            setUser: (userId) => {
                const currentUserId = get().userId;
                
                console.log("Cart Store - Setting user:", { 
                    currentUserId, 
                    newUserId: userId,
                    itemCount: get().items.length 
                });
                
                // If switching users (not just logging out), clear the cart
                if (currentUserId && userId && currentUserId !== userId) {
                    console.log("Cart Store - User switched, clearing cart");
                    set({ items: [], userId });
                    return;
                }
                
                // If logging out (userId becomes null), clear cart
                if (currentUserId && !userId) {
                    console.log("Cart Store - User logged out, clearing cart");
                    set({ items: [], userId: null });
                    return;
                }
                
                // Just update userId (login case)
                set({ userId });
            },

            addItem: (medicine) => {
                const { items } = get();
                const existingItem = items.find((item) => item.id === medicine.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === medicine.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...medicine, quantity: 1 }] });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => {
                set({ items: [] });
                // Also clear from sessionStorage
                if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('pharmacy-cart-storage');
                }
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },

            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: "pharmacy-cart-storage",
            storage: {
                getItem: (name) => {
                    // Use sessionStorage instead of localStorage for privacy
                    const item = sessionStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => {
                    sessionStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    sessionStorage.removeItem(name);
                },
            },
        }
    )
);
