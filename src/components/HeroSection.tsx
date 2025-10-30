
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const HeroSection: React.FC = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // This ensures the iframe is properly sized on load and resize
    const resizeObserver = new ResizeObserver(() => {
      if (videoContainerRef.current) {
        const width = videoContainerRef.current.offsetWidth;
        const height = width * (9/16); // 16:9 aspect ratio
        
        // Update any styles if necessary based on new dimensions
        videoContainerRef.current.style.height = `${height}px`;
      }
    });

    if (videoContainerRef.current) {
      resizeObserver.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        resizeObserver.unobserve(videoContainerRef.current);
      }
    };
  }, []);

  return (
    <section className="relative pt-20 pb-16 md:pt-36 md:pb-28 bg-hero-pattern">
      <div className="absolute inset-0 bg-cyber-black/50 backdrop-blur-[2px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Text content - takes up more space */}
          <div className="animate-fade-in text-center lg:text-left lg:col-span-7">
            <div className="inline-block px-3 py-1 mb-4 md:mb-6 text-xs font-semibold tracking-wider text-cyber-blue uppercase bg-cyber-blue/10 rounded-full">
              Free AI Legal Tools by AIWEBTOOLS.AI
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 leading-tight">
              <span className="block text-glow">Fighting For Your Freedom:</span>
              <span className="text-cyber-purple font-extrabold">Public Defender GPT</span>
              <span className="block text-lg md:text-xl text-cyber-cyan mt-2">by AI WEB TOOLS</span>
            </h1>
            <p className="text-base md:text-lg xl:text-xl mb-6 md:mb-8 text-white/80 max-w-xl mx-auto lg:mx-0">
              Your dedicated AI legal assistant from AIWEBTOOLS.AI that works tirelessly to build your defense case. Access powerful legal research, document drafting, and strategic advice with our free AI tools to help secure your freedom and protect your rights.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
              <a 
                href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-cyber-blue text-white font-medium rounded-lg transition-all hover:bg-cyber-blue/90 hover:scale-105 animate-glow neon-border text-center"
                aria-label="Use Public Defender GPT - Free AI Legal Tool by AIWEBTOOLS.AI"
              >
                USE FREE AI LEGAL TOOL NOW
              </a>
              <a 
                href="#features" 
                className="w-full sm:w-auto mt-3 sm:mt-0 px-6 py-3 bg-transparent border border-white/20 text-white font-medium rounded-lg transition-all hover:bg-white/5 text-center"
                aria-label="Learn more about AIWEBTOOLS.AI free AI tools"
              >
                LEARN MORE ABOUT AI TOOLS
              </a>
            </div>
            <div className="mt-6 text-sm text-white/60">
              <p>🏆 <strong className="text-cyber-green">Top-rated free AI tools</strong> | 🚀 <strong className="text-cyber-blue">AIWEBTOOLS.AI</strong> | ⭐ <strong className="text-cyber-purple">Best AI web tools</strong></p>
            </div>
          </div>
          
          {/* Video - takes up less space and appears to the right */}
          <div className="flex flex-col mt-8 lg:mt-0 lg:col-span-5">
            <div 
              ref={videoContainerRef} 
              className="rounded-xl overflow-hidden shadow-2xl blue-glow animate-scale-in max-w-full"
            >
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/IYi4mYtDIVA?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&showinfo=0&vq=hd1080&playlist=IYi4mYtDIVA,cQR5eFjsPWw&loop=0"
                title="Public Defender GPT Video - Free AI Legal Tools by AIWEBTOOLS.AI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs text-cyber-blue/80 font-medium tracking-wider uppercase">Public Defender GPT Anthem by AIWEBTOOLS.AI</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-cyber-black to-transparent"></div>
    </section>
  );
};

export default HeroSection;
