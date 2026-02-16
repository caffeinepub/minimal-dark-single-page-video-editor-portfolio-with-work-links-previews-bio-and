import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';

export default function IntroSection() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="intro"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div
        className={`max-w-5xl mx-auto text-center space-y-12 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Video Editor
          </h1>
          <p className="text-xl md:text-3xl lg:text-4xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Crafting compelling visual stories through creative editing
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button
            onClick={scrollToWork}
            size="lg"
            className="group text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View My Work
            <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
}
