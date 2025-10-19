import React from 'react';

const Logo = ({ className = "", size = "w-12 h-12" }) => {
  return (
    <div className={`relative ${size} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background glow effect */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#0066cc" stopOpacity="0.1"/>
          </radialGradient>
          
          {/* Gradient for letters */}
          <linearGradient id="letterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff"/>
            <stop offset="50%" stopColor="#0088cc"/>
            <stop offset="100%" stopColor="#0066aa"/>
          </linearGradient>
          
          {/* Circuit line gradient */}
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff"/>
            <stop offset="100%" stopColor="#0066cc"/>
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background glow */}
        <circle cx="60" cy="60" r="55" fill="url(#glow)" opacity="0.3"/>
        
        {/* Hexagonal outline */}
        <polygon
          points="60,15 85,30 85,60 60,75 35,60 35,30"
          fill="none"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          filter="url(#glowFilter)"
        />
        
        {/* Circuit board lines and nodes */}
        {/* Horizontal lines */}
        <line x1="25" y1="25" x2="45" y2="25" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="75" y1="25" x2="95" y2="25" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="25" y1="95" x2="45" y2="95" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="75" y1="95" x2="95" y2="95" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        
        {/* Vertical lines */}
        <line x1="25" y1="25" x2="25" y2="45" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="95" y1="25" x2="95" y2="45" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="25" y1="75" x2="25" y2="95" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="95" y1="75" x2="95" y2="95" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        
        {/* Circuit nodes */}
        <circle cx="25" cy="25" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="45" cy="25" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="75" cy="25" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="95" cy="25" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="25" cy="45" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="95" cy="45" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="25" cy="75" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="95" cy="75" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="25" cy="95" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="45" cy="95" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="75" cy="95" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="95" cy="95" r="2" fill="#00d4ff" filter="url(#glowFilter)"/>
        
        {/* Internal circuit connections */}
        <line x1="40" y1="35" x2="50" y2="35" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="70" y1="35" x2="80" y2="35" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="40" y1="85" x2="50" y2="85" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        <line x1="70" y1="85" x2="80" y2="85" stroke="url(#circuitGradient)" strokeWidth="1" filter="url(#glowFilter)"/>
        
        {/* Internal nodes */}
        <circle cx="45" cy="35" r="1.5" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="75" cy="35" r="1.5" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="45" cy="85" r="1.5" fill="#00d4ff" filter="url(#glowFilter)"/>
        <circle cx="75" cy="85" r="1.5" fill="#00d4ff" filter="url(#glowFilter)"/>
        
        {/* Letter U */}
        <path
          d="M 45 40 L 45 55 L 48 58 L 52 58 L 55 55 L 55 40"
          fill="none"
          stroke="url(#letterGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFilter)"
        />
        
        {/* Letter G */}
        <path
          d="M 65 40 L 65 58 L 75 58 L 75 52 L 70 52 L 70 46 L 75 46"
          fill="none"
          stroke="url(#letterGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFilter)"
        />
      </svg>
    </div>
  );
};

export default Logo;
