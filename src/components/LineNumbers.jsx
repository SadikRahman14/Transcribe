import React, { useRef, useEffect } from 'react';

export default function LineNumbers({ code, errors = [], scrollRef }) {
  // 1. Generate line numbers based on newline characters
  const lineCount = code.split('\n').length;
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  // 2. Map errors to a Set for O(1) lookup
  const errorLines = new Set(errors.map(e => e.line));

  return (
    <div 
      ref={scrollRef} // This ref allows us to control scroll from the parent
      className="hidden md:block select-none py-1 text-right bg-slate-900/50 border-r border-slate-800/50 text-slate-600 font-mono text-sm leading-6 overflow-hidden w-12 flex-shrink-0"
      aria-hidden="true"
    >
      {lines.map(num => (
        <div 
          key={num} 
          className={`pr-3 transition-colors duration-200 ${
            errorLines.has(num) 
              ? 'text-red-500 font-bold bg-red-900/10' // ERROR STYLE
              : ''
          }`}
        >
          {num}
        </div>
      ))}
    </div>
  );
}