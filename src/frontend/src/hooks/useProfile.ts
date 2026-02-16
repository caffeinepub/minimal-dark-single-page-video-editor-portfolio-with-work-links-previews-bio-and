import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Profile } from '@/backend';

export function useGetProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<Profile | null>({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: Profile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

