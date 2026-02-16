interface VideoEmbedProps {
  embedUrl: string;
  provider: string;
}

export default function VideoEmbed({ embedUrl, provider }: VideoEmbedProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-muted" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`${provider} video`}
      />
    </div>
  );
}

