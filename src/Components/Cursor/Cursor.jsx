import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      if (cursor && follower) {
        gsap.set(cursor, {
          x: cursorX,
          y: cursorY,
        });

        gsap.set(follower, {
          x: followerX,
          y: followerY,
        });
      }

      requestAnimationFrame(animate);
    };

    // Interactive elements
    const handleMouseEnter = () => {
      if (cursor && follower) {
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, duration: 0.3 });
      }
    };

    const handleMouseLeave = () => {
      if (cursor && follower) {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-primary-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-primary-400 rounded-full pointer-events-none z-[9999] mix-blend-difference opacity-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default Cursor;

