
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

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cyber-black/80 backdrop-blur-lg shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Logo />
        
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
          className="md:hidden text-white flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cyber-dark glass-panel animate-slide-in-right">
          <nav className="flex flex-col space-y-4 p-6">
            <a 
              href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 bg-cyber-blue text-white font-medium rounded-lg text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              USE PUBLIC DEFENDER GPT NOW
            </a>
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 text-white/90 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              MORE AI TOOLS
            </a>
            <a 
              href="#faq" 
              className="px-4 py-2 text-white/90 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="#testimonials" 
              className="px-4 py-2 text-white/90 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              TESTIMONIALS
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
