import { useGetProfile } from '@/hooks/useProfile';
import { Link as LinkIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from '@/hooks/useInView';

export default function AboutSection() {
  const { data: profile, isLoading } = useGetProfile();
  const { ref, isInView } = useInView({ threshold: 0.2 });

  if (isLoading) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          <Skeleton className="h-16 w-64 mx-auto" />
          <Skeleton className="h-48 w-full" />
        </div>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div
        className={`max-w-4xl mx-auto w-full space-y-16 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-center tracking-tight">
          About Me
        </h2>

        <Card className="border-border/50 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-xl">
          <CardContent className="p-10 md:p-16 space-y-10">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                {profile.displayName}
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap font-light">
                {profile.bio}
              </p>
            </div>

            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  <LinkIcon className="h-4 w-4" />
                  <span>Connect</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {profile.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-all duration-200 hover:scale-105 inline-block font-medium"
                    >
                      {new URL(link).hostname.replace('www.', '')}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
