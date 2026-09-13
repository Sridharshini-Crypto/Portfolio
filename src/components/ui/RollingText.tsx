'use client';

import React from 'react';

interface RollingTextProps {
  text: string;
  className?: string;
}

export function RollingText({ text, className = '' }: RollingTextProps) {
  return (
    <span className={`inline-block relative overflow-hidden group/roll align-top select-none ${className}`}>
      {/* Upper text that slides up on hover */}
      <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover/roll:-translate-y-full">
        {text}
      </span>
      {/* Lower text that slides into view from below */}
      <span className="inline-block absolute top-0 left-0 transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-full group-hover/roll:translate-y-0 text-[#2563EB] dark:text-[#FF8DAF]">
        {text}
      </span>
    </span>
  );
}

export default RollingText;

