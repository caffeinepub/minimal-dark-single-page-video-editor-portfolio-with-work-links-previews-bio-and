import { Phone, Mail } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export default function ContactSection() {
  return (
    <section className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact - Left Side */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:8894054296"
                aria-label="Call 8894054296"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Phone className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-base">8894054296</span>
              </a>

              {/* Email */}
              <a
                href="mailto:ishantcreates7@gmail.com"
                aria-label="Email ishantcreates7@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-base break-all">ishantcreates7@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Social Handle - Right Side */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Social Handle</h2>
            <div className="space-y-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/_ishant.fx?igsh=ejBmbjlpdmE5a3Vq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Instagram profile @_ishant.fx"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <SiInstagram className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-base">@_ishant.fx</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
