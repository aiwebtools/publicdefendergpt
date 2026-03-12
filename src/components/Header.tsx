
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, FileText, Pen, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('nav') && !target.closest('button')) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen, closeMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-top ${
        isScrolled ? 'bg-cyber-black/80 backdrop-blur-lg shadow-md py-2' : 'bg-transparent py-3 md:py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Logo size="sm" className="md:hidden" />
        <Logo className="hidden md:flex" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center space-x-1 lg:space-x-3">
            <div className="flex space-x-1 lg:space-x-3">
              <a 
                href="#testimonials" 
                className="px-2.5 py-1.5 text-xs lg:text-sm text-white/90 hover:text-white transition-colors hover:bg-white/5 rounded-md"
              >
                TESTIMONIALS
              </a>
              <a 
                href="https://chatgpt.com/g/g-Y8u3YrS1p-contract-review-bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-2.5 py-1.5 text-xs lg:text-sm text-white/90 hover:text-white transition-colors hover:bg-white/5 rounded-md"
              >
                <FileText className="h-3.5 w-3.5 mr-1.5" /> CONTRACT REVIEW
              </a>
              <a 
                href="https://chatgpt.com/g/g-psFYnFC8P-legal-draftsmith-gpt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-2.5 py-1.5 text-xs lg:text-sm text-white/90 hover:text-white transition-colors hover:bg-white/5 rounded-md"
              >
                <Pen className="h-3.5 w-3.5 mr-1.5" /> LEGAL DRAFTSMITH
              </a>
              <a 
                href="#faq" 
                className="px-2.5 py-1.5 text-xs lg:text-sm text-white/90 hover:text-white transition-colors hover:bg-white/5 rounded-md"
              >
                FAQ
              </a>
              <a 
                href="https://aiwebtools.lovable.app/?via=aiwebtools" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 text-xs lg:text-sm text-white/90 hover:text-white transition-colors hover:bg-white/5 rounded-md whitespace-nowrap"
              >
                MORE AI TOOLS
              </a>
            </div>
            
            <div className="border-r border-white/10 h-6 mx-1"></div>
            
            <a 
              href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-2 bg-cyber-blue text-white text-sm font-medium rounded-lg transition-all hover:bg-cyber-blue/90 hover:scale-105 animate-glow neon-border flex items-center"
            >
              <span className="whitespace-nowrap">PUBLIC DEFENDER GPT</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white flex items-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 active:scale-95 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - slide down with CSS transition */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-cyber-dark/98 backdrop-blur-xl shadow-2xl border-t border-white/10 transition-all duration-200 ease-out origin-top ${
          mobileMenuOpen 
            ? 'opacity-100 scale-y-100 pointer-events-auto' 
            : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
        style={{ transformOrigin: 'top center' }}
      >
        <nav className="flex flex-col p-4 max-h-[80vh] overflow-y-auto safe-area-bottom">
          <a 
            href="#testimonials" 
            className="block px-4 py-3 text-white/90 hover:text-white rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
            onClick={closeMenu}
          >
            TESTIMONIALS
          </a>
          <a 
            href="https://chatgpt.com/g/g-Y8u3YrS1p-contract-review-bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-4 py-3 text-white/90 hover:text-white rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
            onClick={closeMenu}
          >
            <FileText className="h-4 w-4 mr-2 flex-shrink-0" /> CONTRACT REVIEW BOT
          </a>
          <a 
            href="https://chatgpt.com/g/g-psFYnFC8P-legal-draftsmith-gpt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-4 py-3 text-white/90 hover:text-white rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
            onClick={closeMenu}
          >
            <Pen className="h-4 w-4 mr-2 flex-shrink-0" /> LEGAL DRAFTSMITH AI
          </a>
          <a 
            href="#faq" 
            className="block px-4 py-3 text-white/90 hover:text-white rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
            onClick={closeMenu}
          >
            FAQ
          </a>
          <a 
            href="https://aiwebtools.lovable.app/?via=aiwebtools" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block px-4 py-3 text-white/90 hover:text-white rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
            onClick={closeMenu}
          >
            MORE AI TOOLS
          </a>
          <div className="border-t border-white/10 my-2"></div>
          <a 
            href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-3 mt-2 bg-cyber-blue text-white font-medium rounded-lg text-center hover:bg-cyber-blue/90 active:bg-cyber-blue/80 flex items-center justify-center transition-colors"
            onClick={closeMenu}
          >
            PUBLIC DEFENDER GPT
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </nav>
      </div>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-0 bg-black/50 -z-10" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
