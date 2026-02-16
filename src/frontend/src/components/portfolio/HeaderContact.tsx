import { Mail, Phone } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export default function HeaderContact() {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <a
        href="tel:8894054296"
        className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group whitespace-nowrap"
        aria-label="Phone: 8894054296"
      >
        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
        <span className="hidden sm:inline">8894054296</span>
      </a>
      <a
        href="mailto:ishantcreates7@gmail.com"
        className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group"
        aria-label="Email: ishantcreates7@gmail.com"
      >
        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
        <span className="hidden md:inline truncate max-w-[120px] lg:max-w-none">ishantcreates7@gmail.com</span>
      </a>
      <a
        href="https://www.instagram.com/_ishant.fx?igsh=ejBmbjlpdmE5a3Vq"
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group whitespace-nowrap"
        aria-label="Instagram: _ishant.fx"
      >
        <SiInstagram className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
        <span className="hidden sm:inline">Instagram</span>
      </a>
    </div>
  );
}
