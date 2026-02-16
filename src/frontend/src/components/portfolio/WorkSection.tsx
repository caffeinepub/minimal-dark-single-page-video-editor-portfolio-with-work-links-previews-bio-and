import { useGetAllWorkItems } from '@/hooks/useWorkItems';
import WorkGrid from '@/components/work/WorkGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from '@/hooks/useInView';

export default function WorkSection() {
  const { data: workItems, isLoading } = useGetAllWorkItems();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="work" ref={ref} className="min-h-screen px-6 py-24">
      <div
        className={`max-w-7xl mx-auto space-y-16 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-center tracking-tight">
          My Work
        </h2>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        )}

        {!isLoading && workItems && workItems.length === 0 && (
          <div className="text-center text-muted-foreground py-20">
            <p className="text-xl font-light">No work items yet. Check back soon!</p>
          </div>
        )}

        {!isLoading && workItems && workItems.length > 0 && (
          <WorkGrid items={workItems} />
        )}
      </div>
    </section>
  );
}
