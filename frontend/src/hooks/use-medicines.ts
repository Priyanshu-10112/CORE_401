import { useQuery } from "@tanstack/react-query";
import { medicineService } from "@/lib/medicine-service";

export function useMedicines(search?: string, category?: string) {
    return useQuery({
        queryKey: ["medicines", search, category],
        queryFn: () => medicineService.getMedicines(search, category),
    });
}

export function useMedicine(id: string) {
    return useQuery({
        queryKey: ["medicine", id],
        queryFn: () => medicineService.getMedicineById(id),
        enabled: !!id,
    });
}

export function useMedicinesByCategory(category: string) {
    return useQuery({
        queryKey: ["medicines", "category", category],
        queryFn: () => medicineService.getMedicinesByCategory(category),
        enabled: !!category,
    });
}

export function useSearchMedicines(query: string) {
    return useQuery({
        queryKey: ["medicines", "search", query],
        queryFn: () => medicineService.searchMedicines(query),
        enabled: !!query && query.length > 2, // Only search if query is longer than 2 characters
    });
}

export function useFeaturedMedicines() {
    return useQuery({
        queryKey: ["medicines", "featured"],
        queryFn: () => medicineService.getFeaturedMedicines(),
    });
}
