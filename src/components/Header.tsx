
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-cyber-blue text-white font-medium rounded-lg transition-all hover:bg-cyber-blue/90 hover:scale-105 animate-glow neon-border"
          >
            USE PUBLIC DEFENDER GPT NOW
          </a>
          <a 
            href="https://www.aiwebtools.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 text-white/90 hover:text-white transition-colors"
          >
            MORE AI TOOLS
          </a>
          <a 
            href="#faq" 
            className="px-4 py-2 text-white/90 hover:text-white transition-colors"
          >
            FAQ
          </a>
          <a 
            href="#testimonials" 
            className="px-4 py-2 text-white/90 hover:text-white transition-colors"
          >
            TESTIMONIALS
          </a>
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
              href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 mb-3 bg-cyber-blue text-white font-medium rounded-lg text-center hover:bg-cyber-blue/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              USE PUBLIC DEFENDER GPT NOW
            </a>
            <div className="space-y-2 border-t border-white/10 pt-3">
              <a 
                href="https://www.aiwebtools.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-white/90 hover:text-white rounded-md hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                MORE AI TOOLS
              </a>
              <a 
                href="#faq" 
                className="block px-4 py-2.5 text-white/90 hover:text-white rounded-md hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="#testimonials" 
                className="block px-4 py-2.5 text-white/90 hover:text-white rounded-md hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                TESTIMONIALS
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
