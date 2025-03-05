
import React, { useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);

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
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-hero-pattern">
      <div className="absolute inset-0 bg-cyber-black/50 backdrop-blur-[2px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-cyber-blue uppercase bg-cyber-blue/10 rounded-full">
              AI-Powered Legal Defense
            </div>
            <h1 className="mb-6">
              <span className="block text-glow">Your AI Legal Assistant:</span>
              <span className="text-cyber-purple font-extrabold">Public Defender GPT</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80 max-w-xl">
              A comprehensive legal assistant offering tailored support to public defenders and their clients. Deep legal research, document drafting, and strategic advice to build the strongest possible defense.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-cyber-blue text-white font-medium rounded-lg transition-all hover:bg-cyber-blue/90 hover:scale-105 animate-glow neon-border"
              >
                USE PUBLIC DEFENDER GPT NOW
              </a>
              <a 
                href="#features" 
                className="px-8 py-3 bg-transparent border border-white/20 text-white font-medium rounded-lg transition-all hover:bg-white/5"
              >
                LEARN MORE
              </a>
            </div>
          </div>
          
          <div ref={videoContainerRef} className="rounded-xl overflow-hidden shadow-2xl blue-glow animate-scale-in">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/cQR5eFjsPWw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&showinfo=0&vq=hd1080" 
              title="Public Defender GPT Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyber-black to-transparent"></div>
    </section>
  );
};

export default HeroSection;
