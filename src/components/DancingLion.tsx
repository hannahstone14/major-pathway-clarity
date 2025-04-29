
import React, { useState, useEffect } from 'react';
import { MoveUp, MoveDown, MoveLeft, MoveRight } from "lucide-react";

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
      <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg relative">
        {/* Lion face */}
        <div className="absolute w-full h-full rounded-full bg-yellow-400">
          {/* Eyes */}
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-black"></div>
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black"></div>
          
          {/* Nose */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-2 rounded-full bg-pink-500"></div>
          
          {/* Mouth */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-2 rounded-full border-t-2 border-black"></div>
          
          {/* Ears */}
          <div className="absolute top-0 left-1 w-4 h-4 rounded-full bg-yellow-500 transform -rotate-30 -translate-y-1"></div>
          <div className="absolute top-0 right-1 w-4 h-4 rounded-full bg-yellow-500 transform rotate-30 -translate-y-1"></div>
          
          {/* Mane */}
          <div className="absolute -inset-3 z-[-1]">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-3 h-6 bg-orange-500 rounded-full"
                style={{ 
                  transform: `rotate(${i * 30}deg) translateY(-8px)`, 
                  transformOrigin: 'center bottom',
                  animation: `danceMane${i % 4} 1s infinite alternate ease-in-out`,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Moving icons to give a sense of movement */}
        <MoveUp className="absolute -top-6 text-orange-600 opacity-70 animate-bounce" size={16} />
        <MoveDown className="absolute -bottom-6 text-orange-600 opacity-70 animate-bounce" size={16} />
        <MoveLeft className="absolute -left-6 text-orange-600 opacity-70 animate-bounce" size={16} />
        <MoveRight className="absolute -right-6 text-orange-600 opacity-70 animate-bounce" size={16} />
      </div>
    </div>
  );
}
