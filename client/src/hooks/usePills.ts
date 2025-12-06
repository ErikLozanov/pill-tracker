import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react"; 
import {
    fetchPills,
    addPill,
    logPillIntake,
    deletePill,
    updatePill,
    fetchPillById,
    undoPillIntake,
} from "../api/pills";
import { toast } from "sonner";

export const usePills = (id?: number) => {
    const queryClient = useQueryClient();
    const { getToken } = useAuth(); // <--- Get the token function

    const { data: pills, isLoading } = useQuery({
        queryKey: ["pills"],
        queryFn: async () => {
            const token = await getToken();
            if (!token) return []; // Return empty if not logged in
            return fetchPills(token);
        },
    });

    const { data: pill } = useQuery({
        queryKey: ["pill", id],
        queryFn: async () => {
            const token = await getToken();
            if (!token) throw new Error("No token");
            return fetchPillById(token, id!);
        },
        enabled: !!id,
    });

    const addMutation = useMutation({
        mutationFn: async (data: any) => {
            const token = await getToken();
            return addPill(token!, data);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pills"] }),
    });

    const takeMutation = useMutation({
        mutationFn: async (pillId: number) => {
            const token = await getToken();
            return logPillIntake(token!, pillId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pills"] });
            toast.success("Pill taken!");
        },
        onError: () => toast.error("Failed to record intake"),
    });

    const updateMutation = useMutation({
        mutationFn: async (data: any) => {
            const token = await getToken();
            return updatePill(token!, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pills"] });
            queryClient.invalidateQueries({ queryKey: ["pill", id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (pillId: number) => {
            const token = await getToken();
            return deletePill(token!, pillId);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pills"] }),
    });

    const undoMutation = useMutation({
        mutationFn: async (pillId: number) => {
            const token = await getToken();
            return undoPillIntake(token!, pillId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pills"] });
            toast.info("Intake undone");
        },
    });

    return {
        pills,
        pill,
        isLoading,
        addPill: addMutation.mutate,
        isAdding: addMutation.isPending,
        takePill: takeMutation.mutate,
        isTaking: takeMutation.isPending,
        updatePill: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        deletePill: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        undoPill: undoMutation.mutate,
        isUndoing: undoMutation.isPending,
    };
};