import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeaderContact from './HeaderContact';
import LoginButton from '../admin/LoginButton';

const sections = [
  { id: 'intro', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Top row: Logo, Contact, Login, Mobile Menu */}
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <button
                onClick={() => scrollToSection('intro')}
                className="text-base sm:text-lg font-bold tracking-tight hover:text-primary transition-colors flex-shrink-0"
              >
                Portfolio
              </button>

              <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end min-w-0">
                <div className="min-w-0 flex-shrink">
                  <HeaderContact />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <LoginButton />
                  
                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Second row on mobile, inline on desktop */}
            <div className="hidden md:flex items-center justify-center gap-1 -mt-2">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? 'text-primary bg-accent shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background/98 backdrop-blur-lg md:hidden pt-20 animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-6 p-8">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-2xl font-semibold transition-all duration-200 hover:scale-105 ${
                  activeSection === id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
