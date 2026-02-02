import React from 'react';
import logo from '../assets/CodeTrace.png'; // IMPORT THE IMAGE HERE

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 mt-24 pb-12">
      
      {/* 1. Header with Gradient Lines */}
      <div className="flex items-center gap-4 mb-10 opacity-60">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1"></div>
        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          Master the Syntax
        </span>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1"></div>
      </div>

      {/* 2. Feature Cards (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        
        {/* Card 1: Accuracy (Red) */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 p-6 rounded-2xl hover:border-red-500/30 hover:bg-slate-900/60 transition-all duration-300 group hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-200">Line-by-Line Checks</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Precision</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
              We check your code line by line. If you type <code className="bg-slate-800 border border-slate-700 px-1 rounded text-slate-300 text-xs">1</code> instead of <code className="bg-slate-800 border border-slate-700 px-1 rounded text-slate-300 text-xs">-1</code>, we catch the logic error immediately.
          </p>
        </div>

        {/* Card 2: Smart Logic (Purple) */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 p-6 rounded-2xl hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-300 group hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m7.8 16.2-2.9 2.9"/><path d="M2 12h4"/><path d="m7.8 7.8-2.9-2.9"/></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-200">Smart Logic</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">No Format Stress</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Forget about tabs vs spaces. We ignore whitespace errors. Typing <code className="bg-slate-800 border border-slate-700 px-1 rounded text-purple-300 text-xs">a=b</code> is the same as <code className="bg-slate-800 border border-slate-700 px-1 rounded text-purple-300 text-xs">a = b</code>. Focus on the code, not the spacing.
          </p>
        </div>

        {/* Card 3: Controls (Cyan) */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 p-6 rounded-2xl hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 group hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-200">Power Tools</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Workflow</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
              Use <code className="bg-slate-800 border border-slate-700 px-1 rounded text-cyan-400 text-xs">Strict Mode</code> to force fixes. Try <strong>Focus Mode</strong> for a full-screen zen experience.
          </p>
        </div>

      </div>

      {/* 3. Bottom Bar: Brand & Contact */}
      <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Slogan + Logo */}
        <div className="flex items-center gap-3 justify-center md:justify-start">
           {/* <img 
               src={logo}   // USE THE IMPORTED VARIABLE HERE
               alt="CodeTrace Logo" 
               className="h-8 w-auto opacity-80" 
           /> */}
           <div className="text-center md:text-left">
              <div className="text-slate-200 font-bold tracking-tight mb-0.5">Transcribe</div>
              <p className="text-slate-500 tracking-tight text-sm">Build muscle memory, one line at a time.</p>
           </div>
        </div>

        {/* Contact Email Pill */}
        <a 
          href="mailto:sadik.nai.008@gmail.com" 
          className="group flex items-center gap-3 bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-full hover:border-slate-600 hover:bg-slate-800 transition-all cursor-pointer"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse group-hover:bg-cyan-400"></div>
          <span className="text-slate-400 text-sm group-hover:text-white transition-colors font-mono">
            sadik.nai.008@gmail.com
          </span>
          <svg className="text-slate-600 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </a>

      </div>
    </footer>
  );
}