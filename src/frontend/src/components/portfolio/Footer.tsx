import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'portfolio-app');

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          Built with <Heart className="h-4 w-4 text-primary fill-primary" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
        <p className="mt-2">© {currentYear} All rights reserved</p>
      </div>
    </footer>
  );
}

