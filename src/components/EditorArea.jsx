import React, { useState, useRef } from 'react';
import SyntaxHighlighter from './SyntaxHighlighter';
import LineNumbers from './LineNumbers';

export default function EditorArea({ 
  selectedSnippet, userInput, inputRef, 
  onKeyDown, onChange, onSubmit, 
  isFullScreen, setIsFullScreen, isStrictMode,
  errors = [] 
}) {

    const [showGhostText, setShowGhostText] = useState(true);

    // --- SCROLL SYNC REFS ---
    const refCodeScroll = useRef(null);
    const refLinesScroll = useRef(null);
    const userCodeScroll = useRef(null);
    const userLinesScroll = useRef(null);

    // Helper to sync scroll (One-way binding: Content -> Lines)
    const handleScroll = (sourceRef, targetRef) => {
        if (sourceRef.current && targetRef.current) {
            targetRef.current.scrollTop = sourceRef.current.scrollTop;
        }
    };

  return (
    // MODIFIED: Container Logic
    // 1. If FullScreen: fixed position, full width/height, force 2 columns.
    // 2. If Normal: max-width, h-[82vh] (bigger), responsive columns.
    <div className={`transition-all duration-300 ease-in-out grid gap-6 
      ${isFullScreen 
        ? 'fixed inset-0 z-50 bg-slate-950 p-6 h-screen w-screen grid-cols-2' 
        : 'max-w-6xl mx-auto w-full px-4 h-[82vh] grid-cols-1 lg:grid-cols-2'
      }
    `}>
      
      {/* ===================================
          LEFT SIDE: REFERENCE AREA 
      =================================== */}
      {/* REMOVED the {!isFullScreen} check so this stays visible in full screen */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden relative flex flex-col h-full shadow-inner">
          <div className="absolute top-2 right-4 text-xs font-bold text-slate-500 uppercase tracking-widest z-10 bg-slate-900 pl-2">Reference</div>
          
          {/* Flex Container for Lines + Code */}
          <div className="flex flex-1 h-full pt-8">
              
              {/* Line Numbers */}
              <LineNumbers 
                code={selectedSnippet.code} 
                scrollRef={refLinesScroll} 
              />

              {/* Code Area */}
              <div 
                ref={refCodeScroll}
                onScroll={() => handleScroll(refCodeScroll, refLinesScroll)}
                className="overflow-auto custom-scrollbar flex-1 h-full pr-2"
              >
                  <pre className="font-mono text-sm leading-6 tab-4 whitespace-pre p-2">
                    <SyntaxHighlighter code={selectedSnippet.code} baseTextColor="text-slate-400" />
                  </pre>
              </div>
          </div>
      </div>

      {/* ===================================
          RIGHT SIDE: USER EDITOR AREA 
      =================================== */}
      <div className="bg-slate-900 border border-slate-800 relative overflow-hidden rounded-lg flex flex-col h-full group focus-within:ring-1 focus-within:ring-cyan-900 transition-all shadow-2xl">
              
              {/* HEADER BUTTONS (Eye, Focus, Etc) */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
                  <button 
                    onClick={() => setShowGhostText(!showGhostText)}
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded transition-colors ${showGhostText ? 'text-cyan-600 bg-cyan-900/10' : 'text-slate-600 hover:text-slate-400'}`}
                    title={showGhostText ? "Hide Ghost Text" : "Show Ghost Text"}
                  >
                    {showGhostText ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    )}
                  </button>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest group-focus-within:text-cyan-600">
                    {isFullScreen ? 'Zen Mode' : 'Your Editor'}
                  </div>
                  <button onClick={() => setIsFullScreen(!isFullScreen)} className="text-slate-500 hover:text-white transition-colors bg-slate-800/50 p-1 rounded hover:bg-slate-700">
                     {/* Toggle Icon based on state */}
                     {isFullScreen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
                     ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                     )}
                  </button>
              </div>
          
          {/* MAIN EDITING CONTAINER */}
          <div className="flex flex-1 overflow-hidden pt-10">
              
              {/* 1. LINE NUMBERS (Synced) */}
              <LineNumbers 
                code={selectedSnippet.code} 
                errors={errors} 
                scrollRef={userLinesScroll} 
              />

              {/* 2. THE STACK (Ghost + Input) */}
              <div 
                className="relative flex-1 h-full overflow-auto custom-scrollbar" 
                ref={userCodeScroll}
                onScroll={() => handleScroll(userCodeScroll, userLinesScroll)}
              >
                <div className="relative min-h-full p-2"> 
                    
                    {/* A. BACKGROUND GHOST LAYER */}
                    {showGhostText && (
                        <pre className="absolute top-2 left-2 m-0 font-mono text-sm leading-6 tab-4 whitespace-pre select-none pointer-events-none text-slate-700 opacity-50">
                        {selectedSnippet.code}
                        </pre>
                    )}

                    {/* B. HIGHLIGHT LAYER (User Input) */}
                    <pre className="absolute top-2 left-2 m-0 font-mono text-sm leading-6 tab-4 pointer-events-none whitespace-pre z-10">
                        <SyntaxHighlighter code={userInput} baseTextColor="text-cyan-400" />
                    </pre>

                    {/* C. INPUT LAYER (Invisible) */}
                    <textarea 
                        ref={inputRef} 
                        value={userInput} 
                        onChange={onChange} 
                        onKeyDown={(e) => onKeyDown(e, selectedSnippet)}
                        spellCheck="false" 
                        className="absolute top-0 left-0 w-full h-full p-2 m-0 bg-transparent font-mono text-sm leading-6 tab-4 text-slate-200 caret-cyan-400 resize-none outline-none whitespace-pre overflow-hidden z-20" 
                    />
                </div>
              </div>
          </div>

          {!isStrictMode && (
              <div className="absolute bottom-4 right-6 z-30">
                  <button onClick={onSubmit} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-green-900/50 transition-all flex items-center gap-2">
                    <span>Submit & Check</span>
                  </button>
              </div>
          )}
      </div>
    </div>
  );
}