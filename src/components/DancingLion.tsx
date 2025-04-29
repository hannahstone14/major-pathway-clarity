
import React, { useState, useEffect } from 'react';

interface DancingLionProps {
  show: boolean;
}

export function DancingLion({ show }: DancingLionProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  // Animate the lion when it's shown
  useEffect(() => {
    if (!show) return;
    
    // Start animation
    let frame = 0;
    const maxFrames = 60; // Animation will last 60 frames (about 1 second)
    const interval = setInterval(() => {
      frame++;
      
      // Move in a circular pattern
      const x = Math.sin(frame / 10) * 10;
      const y = Math.cos(frame / 10) * 10;
      setPosition({ x, y });
      
      // Rotate and scale
      setRotation(frame * 6);
      setScale(1 + Math.sin(frame / 10) * 0.2);
      
      if (frame >= maxFrames) {
        clearInterval(interval);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, [show]);
  
  if (!show) return null;
  
  return (
    <div 
      className="fixed bottom-10 right-10 z-50 animate-bounce"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <img 
        src="/lovable-uploads/882bc58b-6fe4-4a91-8242-38e92be97d73.png" 
        alt="Dancing Lion" 
        className="w-20 h-20 object-contain"
      />
    </div>
  );
}
