import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { WorkItem } from '@/backend';
import { SEEDED_WORK_ITEMS } from '@/lib/seedWorkItems';

export function useGetAllWorkItems() {
  const { actor, isFetching } = useActor();

  return useQuery<WorkItem[]>({
    queryKey: ['workItems'],
    queryFn: async () => {
      // Always start with seeded items as fallback
      const seededSyntheticItems: WorkItem[] = SEEDED_WORK_ITEMS.map((seedItem, index) => ({
        id: BigInt(-(index + 1)),
        title: seedItem.title,
        description: seedItem.description,
        link: seedItem.link,
        date: BigInt(0),
        orderIndex: BigInt(index),
        isVideo: seedItem.isVideo,
      }));

      // If no actor, return seeded items only
      if (!actor) {
        return seededSyntheticItems;
      }

      try {
        const backendItems = await actor.getAllWorkItems();
        
        // Merge seeded items with backend items
        const mergedItems = [...backendItems];
        const backendLinks = new Set(backendItems.map(item => item.link).filter(Boolean));
        
        // Add seeded items that don't already exist in backend
        SEEDED_WORK_ITEMS.forEach((seedItem, index) => {
          if (seedItem.link && !backendLinks.has(seedItem.link)) {
            const syntheticItem: WorkItem = {
              id: BigInt(-(index + 1)),
              title: seedItem.title,
              description: seedItem.description,
              link: seedItem.link,
              date: BigInt(0),
              orderIndex: BigInt(backendItems.length + index),
              isVideo: seedItem.isVideo,
            };
            mergedItems.push(syntheticItem);
          }
        });
        
        // Sort by orderIndex to maintain proper ordering
        return mergedItems.sort((a, b) => {
          const aIndex = Number(a.orderIndex);
          const bIndex = Number(b.orderIndex);
          return aIndex - bIndex;
        });
      } catch (error) {
        // Log the error for debugging but return seeded items as fallback
        console.error('Error loading work items from backend:', error);
        return seededSyntheticItems;
      }
    },
    enabled: !!actor && !isFetching,
    // Prevent showing error state to user - we always have fallback data
    retry: false,
  });
}

export function useAddWorkItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newWork: { title: string; description: string; link?: string; isVideo: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addWorkItem(newWork);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workItems'] });
    },
  });
}

export function useDeleteWorkItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteWorkItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workItems'] });
    },
  });
}

export function useReorderWorkItems() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOrderIds: bigint[]) => {
      if (!actor) throw new Error('Actor not available');
      await actor.reorderWorkItems(newOrderIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workItems'] });
    },
  });
}
