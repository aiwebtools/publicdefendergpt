
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

    // Enhanced SEO document title with keywords
    document.title = "Public Defender GPT | Free AI Legal Tools by AIWEBTOOLS.AI - #1 AI Web Tools";
    
    // Add meta description dynamically for SPA SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free AI-powered legal defense assistant by AIWEBTOOLS.AI. Best AI tools for public defenders, legal research, document drafting & case analysis. Try our free AI web tools now!');
    }
    
    // Add keywords meta tag dynamically
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'AIWEBTOOLS.AI, AI WEB TOOLS, free ai tools, public defender gpt, ai legal tools, legal ai assistant, ai web tools free, best ai tools, aiwebtools, artificial intelligence tools');
    
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
      title: "Welcome to Public Defender GPT by AIWEBTOOLS.AI",
      description: "Thank you for acknowledging our disclaimer. Enjoy our free AI legal tools!",
    });
  };

  return (
    <div className={`min-h-screen bg-cyber-black text-white overflow-hidden ${isMobile ? 'mobile-snap-scroll smooth-scroll' : ''}`}>
      {/* Enhanced SEO: Hidden text for search engines */}
      <div className="sr-only">
        <h1>AIWEBTOOLS.AI - Free AI Tools for Legal Professionals</h1>
        <p>Public Defender GPT by AI WEB TOOLS - The best free AI tools for legal research, document drafting, and case analysis. AIWEBTOOLS.AI offers cutting-edge artificial intelligence solutions.</p>
      </div>
      
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
