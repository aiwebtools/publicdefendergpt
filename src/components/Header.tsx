
import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Pen, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('nav') && !target.closest('button')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                href="https://www.aiwebtools.ai" 
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
          className="md:hidden text-white flex items-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue/50"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyber-dark bg-opacity-95 backdrop-blur-lg shadow-lg animate-slide-in-right border-t border-white/10">
          <nav className="flex flex-col p-4">
            <a 
              href="#testimonials" 
              className="block px-4 py-2.5 text-white/90 hover:text-white rounded-md hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              TESTIMONIALS
            </a>
            <a 
              href="https://chatgpt.com/g/g-Y8u3YrS1p-contract-review-bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2.5 text-white/90 hover:text-white rounded-md hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="h-4 w-4 mr-2" /> CONTRACT REVIEW BOT
            </a>
            <a 
              href="https://chatgpt.com/g/g-psFYnFC8P-legal-draftsmith-gpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2.5 text-white/90 hover:text-white rounded-md hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Pen className="h-4 w-4 mr-2" /> LEGAL DRAFTSMITH AI
            </a>
            <a 
              href="#faq" 
              className="block px-4 py-2.5 text-white/90 hover:text-white rounded-md hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-4 py-2.5 text-white/90 hover:text-white rounded-md hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              MORE AI TOOLS
            </a>
            <div className="border-t border-white/10 my-2"></div>
            <a 
              href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 mt-2 bg-cyber-blue text-white font-medium rounded-lg text-center hover:bg-cyber-blue/90 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              PUBLIC DEFENDER GPT
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
