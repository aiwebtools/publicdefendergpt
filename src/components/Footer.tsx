
import React from 'react';
import Logo from './Logo';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Logo className="mb-4" />
            <p className="text-white/70 mb-6">
              AI-powered legal assistance for public defenders, enhancing access to justice through technology.
            </p>
            <div className="flex flex-col space-y-2">
              <a 
                href="tel:4758008096" 
                className="flex items-center text-white/70 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                (475) 800-8096
              </a>
              <a 
                href="mailto:Contact@ai-webtools.com" 
                className="flex items-center text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact@ai-webtools.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  USE PUBLIC DEFENDER GPT NOW
                </a>
              </li>
              <li>
                <a 
                  href="https://www.aiwebtools.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  MORE AI TOOLS
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  TESTIMONIALS
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://openai.com/policies/privacy-policy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="https://aiwebtools.ai/terms-of-services" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
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
            >
              © 2025 AI WEB TOOLS LLC
            </a> All rights reserved.
          </p>
          
          <a 
            href="https://www.aiwebtools.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            More AI Tools
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
