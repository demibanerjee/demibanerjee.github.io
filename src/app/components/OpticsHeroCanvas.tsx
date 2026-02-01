import React, { useEffect, useRef } from 'react';

export const OpticsHeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();
    
    // Initialize mouse at center
    mouseX = width / 2;
    mouseY = height / 2;

    const draw = () => {
      const now = Date.now();
      const time = now * 0.0005; // Synchronized global time
      
      // Background: Dark, quantum void
      ctx.fillStyle = 'rgba(5, 5, 15, 0.2)'; 
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      const rows = Math.ceil(height / gridSize);
      const cols = Math.ceil(width / gridSize);

      // Determine the dominant hue based on time (slow cycle)
      // Matches the Home.tsx hue calculation
      const sourceHue = (now * 0.02) % 360; 

      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
          const px = x * gridSize;
          const py = y * gridSize;
          
          // Calculate distance to mouse
          const dx = px - mouseX;
          const dy = py - mouseY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // Wave function based on distance and time
          const angle = Math.sin(dist * 0.01 - time) * Math.PI + Math.atan2(dy, dx);
          const length = 15 + Math.sin(dist * 0.02 + time * 2) * 10;
          
          ctx.beginPath();
          
          // Default: Subtle multi-colored field
          // We mix the base hue with some spatial variation
          const gridHue = (sourceHue + (x/cols)*60 + (y/rows)*60) % 360;
          ctx.strokeStyle = `hsla(${gridHue}, 70%, 50%, 0.3)`;
          
          // Interference "Hotspots" - interaction with mouse "excites" the field
          if (dist < 400) {
             const intensity = (400 - dist) / 400;
             // When interacting, the field glows with the SOURCE color
             ctx.strokeStyle = `hsla(${sourceHue}, 100%, 70%, ${intensity})`;
             ctx.lineWidth = 1 + intensity * 3;
          } else {
             ctx.lineWidth = 1;
          }

          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(angle) * length, py + Math.sin(angle) * length);
          ctx.stroke();
        }
      }
      
      // Draw a "Source" at the mouse - Multi-colored Quantum Singularity
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 150);
      gradient.addColorStop(0, `hsla(${sourceHue}, 100%, 90%, 0.9)`); // White-hot center
      gradient.addColorStop(0.2, `hsla(${sourceHue}, 80%, 60%, 0.6)`); // Bright core
      gradient.addColorStop(0.5, `hsla(${sourceHue}, 80%, 50%, 0.2)`);   // Outer glow
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
