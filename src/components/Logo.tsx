
import React from 'react';
import { Gavel } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 font-bold ${sizeClasses[size]} ${className}`}>
      <Gavel className="text-cyber-blue" />
      <div>
        <div className="flex items-center gap-0.5">
          <span className="text-glow">Public Defender</span>
          <span className="text-cyber-purple font-extrabold">GPT</span>
        </div>
        <p className="text-[0.6em] text-muted-foreground font-normal leading-none mt-0.5">
          Presented by <a href="https://www.aiwebtools.ai" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-blue transition-colors">AiWebTools.AI</a>
        </p>
      </div>
    </div>
  );
};

export default Logo;
