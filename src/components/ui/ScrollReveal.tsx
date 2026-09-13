'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translateY(0px) scale(1)';
    if (direction === 'up') return 'translateY(36px) scale(0.99)';
    if (direction === 'down') return 'translateY(-36px) scale(0.99)';
    return 'none';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionTimingFunction: 'cubic-bezier(0.83, 0, 0.17, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;

