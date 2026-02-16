import { WorkItem } from '@/backend';
import WorkCard from './WorkCard';

interface WorkGridProps {
  items: WorkItem[];
}

export default function WorkGrid({ items }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
      {items.map((item, index) => (
        <div
          key={item.id.toString()}
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
        >
          <WorkCard item={item} />
        </div>
      ))}
    </div>
  );
}
