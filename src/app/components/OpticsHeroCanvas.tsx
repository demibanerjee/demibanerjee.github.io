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
    let time = 0;
    
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
      time += 0.01;
      
      // Clear with dark blue tint for that "laser lab" feel
      ctx.fillStyle = 'rgba(10, 15, 30, 0.2)'; // Slower trail fade
      ctx.fillRect(0, 0, width, height);
      
      // We will draw lines representing "Laser beams" or interference fringes
      // Let's draw a flow field that reacts to the mouse acting as a "Lens" or "Source"
      
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      const rows = Math.ceil(height / gridSize);
      const cols = Math.ceil(width / gridSize);

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
          
          // Color based on "phase" (angle)
          const hue = (angle * 180 / Math.PI + time * 50) % 360;
          
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${200 + Math.sin(time)*50}, 80%, 60%, 0.5)`;
          
          // Interference "Hotspots" - closer to mouse is brighter/different color
          if (dist < 300) {
             ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${(300-dist)/300})`;
          }

          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(angle) * length, py + Math.sin(angle) * length);
          ctx.stroke();
        }
      }
      
      // Draw a "Source" at the mouse
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.2, 'rgba(100, 200, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
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
