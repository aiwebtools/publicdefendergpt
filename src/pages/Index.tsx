import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import LegalDisclaimer from '@/components/LegalDisclaimer';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import AgreementDialog from '@/components/AgreementDialog';
import { useToast } from "@/hooks/use-toast";

const AGREEMENT_KEY = 'public_defender_agreement';

const Index = () => {
  const isMobile = useIsMobile();
  const [showAgreement, setShowAgreement] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already agreed
    const hasAgreed = localStorage.getItem(AGREEMENT_KEY) === 'true';
    if (!hasAgreed) {
      setShowAgreement(true);
    }

    // Update document title
    document.title = "Public Defender GPT | AI-Powered Legal Defense Assistant";
    
    // Smooth scroll to element when hash in URL changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Use smooth scrolling behavior
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // For iOS Safari that sometimes has issues with smooth scrolling
          if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            setTimeout(() => {
              window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
              });
            }, 100);
          }
        }
      }
    };

    // Handle initial hash if present
    if (window.location.hash) {
      setTimeout(handleHashChange, 300);
    }

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Prevent mobile browser address bar from appearing/disappearing 
    // and causing layout shifts
    if (isMobile) {
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'auto';
    }

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isMobile]);

  const handleAgree = () => {
    localStorage.setItem(AGREEMENT_KEY, 'true');
    setShowAgreement(false);
    toast({
      title: "Welcome to Public Defender GPT",
      description: "Thank you for acknowledging our disclaimer.",
    });
  };

  return (
    <div className={`min-h-screen bg-cyber-black text-white overflow-hidden ${isMobile ? 'mobile-snap-scroll smooth-scroll' : ''}`}>
      <AgreementDialog open={showAgreement} onAgree={handleAgree} />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FaqSection />
        <LegalDisclaimer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
