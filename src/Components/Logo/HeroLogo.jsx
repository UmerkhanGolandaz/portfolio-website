import React from 'react';

const HeroLogo = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background glow effect */}
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4"/>
            <stop offset="70%" stopColor="#0088cc" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#0066aa" stopOpacity="0.1"/>
          </radialGradient>
          
          {/* Gradient for letters */}
          <linearGradient id="heroLetterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff"/>
            <stop offset="30%" stopColor="#00aaff"/>
            <stop offset="70%" stopColor="#0088cc"/>
            <stop offset="100%" stopColor="#0066aa"/>
          </linearGradient>
          
          {/* Circuit line gradient */}
          <linearGradient id="heroCircuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff"/>
            <stop offset="50%" stopColor="#00aaff"/>
            <stop offset="100%" stopColor="#0088cc"/>
          </linearGradient>
          
          {/* Enhanced glow filter */}
          <filter id="heroGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background glow */}
        <circle cx="100" cy="100" r="90" fill="url(#heroGlow)" opacity="0.4"/>
        
        {/* Hexagonal outline */}
        <polygon
          points="100,25 140,50 140,100 100,125 60,100 60,50"
          fill="none"
          stroke="url(#heroCircuitGradient)"
          strokeWidth="3"
          filter="url(#heroGlowFilter)"
        />
        
        {/* Extended circuit board lines and nodes */}
        {/* Top horizontal lines */}
        <line x1="40" y1="40" x2="70" y2="40" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        <line x1="130" y1="40" x2="160" y2="40" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        
        {/* Bottom horizontal lines */}
        <line x1="40" y1="160" x2="70" y2="160" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        <line x1="130" y1="160" x2="160" y2="160" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        
        {/* Vertical lines */}
        <line x1="40" y1="40" x2="40" y2="70" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        <line x1="160" y1="40" x2="160" y2="70" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        <line x1="40" y1="130" x2="40" y2="160" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        <line x1="160" y1="130" x2="160" y2="160" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        
        {/* Circuit nodes - larger */}
        <circle cx="40" cy="40" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="70" cy="40" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="130" cy="40" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="160" cy="40" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="40" cy="70" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="160" cy="70" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="40" cy="130" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="160" cy="130" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="40" cy="160" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="70" cy="160" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="130" cy="160" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="160" cy="160" r="3" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        
        {/* Internal circuit connections */}
        <line x1="65" y1="60" x2="80" y2="60" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        <line x1="120" y1="60" x2="135" y2="60" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        <line x1="65" y1="140" x2="80" y2="140" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        <line x1="120" y1="140" x2="135" y2="140" stroke="url(#heroCircuitGradient)" strokeWidth="2" filter="url(#heroGlowFilter)"/>
        
        {/* Additional circuit patterns */}
        <line x1="50" y1="80" x2="50" y2="120" stroke="url(#heroCircuitGradient)" strokeWidth="1" filter="url(#heroGlowFilter)"/>
        <line x1="150" y1="80" x2="150" y2="120" stroke="url(#heroCircuitGradient)" strokeWidth="1" filter="url(#heroGlowFilter)"/>
        <line x1="80" y1="85" x2="120" y2="85" stroke="url(#heroCircuitGradient)" strokeWidth="1" filter="url(#heroGlowFilter)"/>
        <line x1="80" y1="115" x2="120" y2="115" stroke="url(#heroCircuitGradient)" strokeWidth="1" filter="url(#heroGlowFilter)"/>
        
        {/* Internal nodes */}
        <circle cx="72" cy="60" r="2" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="127" cy="60" r="2" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="72" cy="140" r="2" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="127" cy="140" r="2" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="100" cy="85" r="2" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="100" cy="115" r="2" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        
        {/* Letter U - larger and more detailed */}
        <path
          d="M 75 70 L 75 95 L 80 100 L 90 100 L 95 95 L 95 70"
          fill="none"
          stroke="url(#heroLetterGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#heroGlowFilter)"
        />
        
        {/* Letter G - larger and more detailed */}
        <path
          d="M 105 70 L 105 100 L 120 100 L 120 90 L 115 90 L 115 80 L 120 80"
          fill="none"
          stroke="url(#heroLetterGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#heroGlowFilter)"
        />
        
        {/* Additional circuit details */}
        <circle cx="50" cy="90" r="1.5" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="50" cy="110" r="1.5" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="150" cy="90" r="1.5" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
        <circle cx="150" cy="110" r="1.5" fill="#00d4ff" filter="url(#heroGlowFilter)"/>
      </svg>
    </div>
  );
};

export default HeroLogo;
