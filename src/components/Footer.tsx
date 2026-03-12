
import React from 'react';
import Logo from './Logo';
import { Phone, Mail, FileText, Pen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Logo className="mb-4" />
            <p className="text-white/70 mb-6">
              AIWEBTOOLS.AI - Leading provider of free AI tools and web applications. AI-powered legal assistance for public defenders, enhancing access to justice through cutting-edge artificial intelligence technology.
            </p>
            <div className="flex flex-col space-y-2">
              <a 
                href="tel:4758008096" 
                className="flex items-center text-white/70 hover:text-white transition-colors"
                aria-label="Call AI Web Tools customer service"
              >
                <Phone className="h-4 w-4 mr-2" />
                (475) 800-8096
              </a>
              <a 
                href="mailto:Contact@ai-webtools.com" 
                className="flex items-center text-white/70 hover:text-white transition-colors"
                aria-label="Email AI Web Tools support"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact@ai-webtools.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Free AI Tools by AIWEBTOOLS.AI</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Public Defender GPT - Free AI Legal Tool"
                >
                  PUBLIC DEFENDER GPT - FREE AI LEGAL TOOL
                </a>
              </li>
              <li>
                <a 
                  href="https://chatgpt.com/g/g-Y8u3YrS1p-contract-review-bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-white/70 hover:text-white transition-colors"
                  aria-label="Contract Review Bot - Free AI Contract Analysis Tool"
                >
                  <FileText className="h-4 w-4 mr-2" /> 
                  CONTRACT REVIEW BOT - FREE AI TOOL
                </a>
              </li>
              <li>
                <a 
                  href="https://chatgpt.com/g/g-psFYnFC8P-legal-draftsmith-gpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-white/70 hover:text-white transition-colors"
                  aria-label="Legal DraftSmith AI - Free Legal Document Drafting Tool"
                >
                  <Pen className="h-4 w-4 mr-2" /> 
                  LEGAL DRAFTSMITH AI - FREE TOOL
                </a>
              </li>
              <li>
                <a 
                  href="https://aiwebtools.lovable.app/?via=aiwebtools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="AIWEBTOOLS.AI - More Free AI Tools"
                >
                  MORE FREE AI WEB TOOLS
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Frequently Asked Questions about AI Tools"
                >
                  AI TOOLS FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="AI Tools User Testimonials and Reviews"
                >
                  AI TOOLS REVIEWS
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">AIWEBTOOLS.AI Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://openai.com/policies/privacy-policy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="AI Tools Privacy Policy"
                >
                  AI Tools Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://aiwebtools.ai/terms-of-services" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="AI Web Tools Terms of Service"
                >
                  AI Web Tools Terms of Service
                </a>
              </li>
              <li>
                <span className="text-white/70 text-sm">
                  Free AI Tools | Best AI Web Tools | AIWEBTOOLS.AI
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="AIWEBTOOLS.AI - AI Web Tools LLC"
            >
              © 2025 AI WEB TOOLS LLC | AIWEBTOOLS.AI
            </a> - Free AI Tools for Everyone. All rights reserved.
          </p>
          
          <a 
            href="https://www.aiwebtools.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label="Discover More Free AI Web Tools at AIWEBTOOLS.AI"
          >
            Discover More Free AI Tools
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
