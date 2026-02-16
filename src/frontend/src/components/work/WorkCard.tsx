import { WorkItem } from '@/backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import VideoEmbed from './VideoEmbed';
import { detectVideoProvider } from '@/lib/videoProviders';

interface WorkCardProps {
  item: WorkItem;
}

export default function WorkCard({ item }: WorkCardProps) {
  const providerInfo = item.link ? detectVideoProvider(item.link) : null;
  const hasEmbed = providerInfo?.supported && item.isVideo;

  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-2xl hover:scale-[1.02] h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-start justify-between gap-4">
          <span className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
            {item.title}
          </span>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-all duration-200 flex-shrink-0 hover:scale-110"
              title="Open link"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {hasEmbed && providerInfo && (
          <div className="overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
            <VideoEmbed embedUrl={providerInfo.embedUrl} provider={providerInfo.provider} />
          </div>
        )}

        {item.description && (
          <p className="text-muted-foreground leading-relaxed text-base font-light">
            {item.description}
          </p>
        )}

        {!hasEmbed && item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-all duration-200 font-medium"
          >
            View Project <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}
