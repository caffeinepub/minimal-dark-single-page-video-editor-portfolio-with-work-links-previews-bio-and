import { WorkItem } from '@/backend';

// Seeded work items for initial portfolio content
// These are merged with backend items in useWorkItems hook
export const SEEDED_WORK_ITEMS: Omit<WorkItem, 'id' | 'date' | 'orderIndex'>[] = [
  {
    title: 'My Work',
    description: '',
    link: 'https://youtube.com/shorts/ray6GXDMXug?feature=share',
    isVideo: true,
  },
  {
    title: 'My Work',
    description: '',
    link: 'https://youtube.com/shorts/v604ax9a_Xs?feature=share',
    isVideo: true,
  },
  {
    title: 'My Work',
    description: '',
    link: 'https://youtube.com/shorts/MeIGa2QyRZY?feature=share',
    isVideo: true,
  },
  {
    title: 'My Work',
    description: '',
    link: 'https://youtube.com/shorts/A2TwkU0DDSA?feature=share',
    isVideo: true,
  },
  {
    title: 'My Work',
    description: '',
    link: 'https://youtu.be/YfkEA9G75YE',
    isVideo: true,
  },
];
