import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPills, addPill, logPillIntake} from '../api/pills';

export const usePills = () => {
  const queryClient = useQueryClient();

  // 1. Get Data
  const { data: pills, isLoading, isError } = useQuery({
    queryKey: ['pills'],
    queryFn: fetchPills,
  });

  // 2. Add Data
  const addMutation = useMutation({
    mutationFn: addPill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pills'] });
    },
  });

  // 3. Log Intake (Take Pill)
  const logMutation = useMutation({
    mutationFn: logPillIntake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pills'] });
    },
  });

  return {
    pills,
    isLoading,
    isError,
    addPill: addMutation.mutate,
    isAdding: addMutation.isPending,
    takePill: logMutation.mutate,
    isTaking: logMutation.isPending,
  };
};