import React, { useEffect, useRef, useState } from 'react';

const BlackHoleEffect: React.FC = () => {
  const feImageRef = useRef<SVGFEImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // States & Refs for Lens Position and Physics
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const vel = useRef({ x: (Math.random() - 0.5) * 1.5, y: (Math.random() - 0.5) * 1.5 });
  const mouse = useRef({ x: 0, y: 0 });
  const mouseActive = useRef(false);
  const lastMouseMoveTime = useRef(Date.now());
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const wanderAngle = useRef(Math.random() * Math.PI * 2);

  const [displacementMapUrl, setDisplacementMapUrl] = useState<string>('');
  const [, setIsHovered] = useState(false);

  // Constants
  const MAP_SIZE = 512;
  const HALF_MAP = MAP_SIZE / 2;

  // 1. Generate transparent refraction displacement map programmatically on mount
  useEffect(() => {
    const generateDisplacementMap = (): string => {
      const size = MAP_SIZE;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';

      const imgData = ctx.createImageData(size, size);
      const data = imgData.data;
      const center = size / 2;
      const maxR = size / 2;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const dx = x - center;
          const dy = y - center;
          const r = Math.sqrt(dx * dx + dy * dy);
          const u = r / maxR;
          const idx = (y * size + x) * 4;

          if (u >= 1.0) {
            // Neutral gray: 0 displacement at the edges
            data[idx] = 128;
            data[idx + 1] = 128;
            data[idx + 2] = 0;
            data[idx + 3] = 255;
          } else {
            // Smooth magnification refraction bubble formula
            // Zoom factor is zero at center and edges, peaking at u = 0.4
            const strength = 1.6;
            const factor = strength * u * Math.pow(1.0 - u, 1.5);
            
            const nx = r > 0 ? dx / r : 0;
            const ny = r > 0 ? dy / r : 0;

            const offset_x = -nx * factor;
            const offset_y = -ny * factor;

            data[idx] = Math.max(0, Math.min(255, Math.floor(128 + offset_x * 127)));
            data[idx + 1] = Math.max(0, Math.min(255, Math.floor(128 + offset_y * 127)));
            data[idx + 2] = 0;
            data[idx + 3] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      return canvas.toDataURL('image/png');
    };

    setDisplacementMapUrl(generateDisplacementMap());
  }, []);

  // 2. Set up event listeners and physics loops
  useEffect(() => {
    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      mouseActive.current = true;
      lastMouseMoveTime.current = Date.now();

      // Check if mouse is hovering over the center of the invisible lens
      const dx = e.clientX - pos.current.x;
      const dy = e.clientY - pos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const hovered = dist < 70;
      setIsHovered(hovered);

      if (isDragging.current) {
        pos.current.x = e.clientX - dragOffset.current.x;
        pos.current.y = e.clientY - dragOffset.current.y;
        document.body.style.cursor = 'grabbing';
      } else if (hovered) {
        document.body.style.cursor = 'grab';
      } else {
        // Only clear cursor if it was set by this effect
        if (document.body.style.cursor === 'grab' || document.body.style.cursor === 'grabbing') {
          document.body.style.cursor = '';
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const dx = e.clientX - pos.current.x;
      const dy = e.clientY - pos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 70) {
        isDragging.current = true;
        dragOffset.current = { x: dx, y: dy };
        document.body.style.cursor = 'grabbing';
        e.preventDefault();
      }
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = '';
      }
    };

    // Mobile / Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const dx = touch.clientX - pos.current.x;
      const dy = touch.clientY - pos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        isDragging.current = true;
        dragOffset.current = { x: dx, y: dy };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      mouse.current = { x: touch.clientX, y: touch.clientY };
      mouseActive.current = true;
      lastMouseMoveTime.current = Date.now();

      if (isDragging.current) {
        pos.current.x = touch.clientX - dragOffset.current.x;
        pos.current.y = touch.clientY - dragOffset.current.y;
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    // Main animation loop
    let animationFrameId: number;

    const updateAndRender = () => {
      // 1. Mouse idle check: return to free drift if idle for > 3 seconds
      if (Date.now() - lastMouseMoveTime.current > 3000) {
        mouseActive.current = false;
      }

      // 2. Physics calculations for position
      if (!isDragging.current) {
        if (mouseActive.current) {
          // Attract towards the mouse
          const dx = mouse.current.x - pos.current.x;
          const dy = mouse.current.y - pos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 5) {
            const pullForce = 0.08;
            vel.current.x += (dx / dist) * pullForce;
            vel.current.y += (dy / dist) * pullForce;
          }
        } else {
          // Wander mode: drift organically
          wanderAngle.current += (Math.random() - 0.5) * 0.4;
          const wanderForce = 0.05;
          vel.current.x += Math.cos(wanderAngle.current) * wanderForce;
          vel.current.y += Math.sin(wanderAngle.current) * wanderForce;
        }

        // Apply friction/drag to velocity
        vel.current.x *= 0.98;
        vel.current.y *= 0.98;

        // Clamp speed
        const speed = Math.sqrt(vel.current.x * vel.current.x + vel.current.y * vel.current.y);
        const maxSpeed = mouseActive.current ? 5.0 : 1.5;
        if (speed > maxSpeed) {
          vel.current.x = (vel.current.x / speed) * maxSpeed;
          vel.current.y = (vel.current.y / speed) * maxSpeed;
        }

        pos.current.x += vel.current.x;
        pos.current.y += vel.current.y;

        // Bounce off screen walls
        const borderPadding = 120;
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (pos.current.x < borderPadding) {
          pos.current.x = borderPadding;
          vel.current.x = Math.abs(vel.current.x) * 0.8;
        } else if (pos.current.x > w - borderPadding) {
          pos.current.x = w - borderPadding;
          vel.current.x = -Math.abs(vel.current.x) * 0.8;
        }

        if (pos.current.y < borderPadding) {
          pos.current.y = borderPadding;
          vel.current.y = Math.abs(vel.current.y) * 0.8;
        } else if (pos.current.y > h - borderPadding) {
          pos.current.y = h - borderPadding;
          vel.current.y = -Math.abs(vel.current.y) * 0.8;
        }
      }

      // 3. Update SVG Filter Position directly in DOM (high performance)
      if (feImageRef.current) {
        const scrollX = window.scrollX || window.pageXOffset || 0;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        feImageRef.current.setAttribute('x', `${pos.current.x + scrollX - HALF_MAP}`);
        feImageRef.current.setAttribute('y', `${pos.current.y + scrollY - HALF_MAP}`);
      }

      // Queue next frame
      animationFrameId = requestAnimationFrame(updateAndRender);
    };

    // Run the loop
    animationFrameId = requestAnimationFrame(updateAndRender);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      // Cleanup cursor if it was left grabbing
      if (document.body.style.cursor === 'grab' || document.body.style.cursor === 'grabbing') {
        document.body.style.cursor = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[40]">
      {/* SVG Filter Definition for space distortion */}
      {displacementMapUrl && (
        <svg
          style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <defs>
            <filter
              id="blackhole-lens"
              x="0"
              y="0"
              width="100%"
              height="100%"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              {/* solid neutral gray base (RGB 128,128,128 means 0 displacement) */}
              <feFlood floodColor="#808080" floodOpacity="1" result="neutral-base" />

              {/* local displacement map image which moves with the bubble */}
              <feImage
                ref={feImageRef}
                href={displacementMapUrl}
                x={pos.current.x - HALF_MAP}
                y={pos.current.y - HALF_MAP}
                width={MAP_SIZE}
                height={MAP_SIZE}
                result="local-warp"
              />

              {/* overlay the displacement map on top of the neutral base */}
              <feComposite
                in="local-warp"
                in2="neutral-base"
                operator="over"
                result="displacement-map"
              />

              {/* apply displacement to the content behind with a high warp scale */}
              <feDisplacementMap
                in="SourceGraphic"
                in2="displacement-map"
                scale="135"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default BlackHoleEffect;
