import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import IntroSection from './components/portfolio/IntroSection';
import AboutSection from './components/portfolio/AboutSection';
import WorkSection from './components/portfolio/WorkSection';
import ContactSection from './components/portfolio/ContactSection';
import SectionNav from './components/portfolio/SectionNav';
import Footer from './components/portfolio/Footer';
import AdminPanel from './components/admin/AdminPanel';
import { useAdminStatus } from './hooks/useAdminStatus';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const { isAdmin, isLoading: adminLoading } = useAdminStatus();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground">
        <SectionNav />

        <main>
          <IntroSection />
          <AboutSection />
          <WorkSection />
          <ContactSection />
        </main>

        {isAdmin && !adminLoading && <AdminPanel />}

        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
