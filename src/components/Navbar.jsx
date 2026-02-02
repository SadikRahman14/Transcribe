import React from 'react';
import logo from '../assets/LittleT.png'; 

// ADD isFullScreen TO PROPS HERE 👇
export default function Navbar({ wpm, status, isStrictMode, setIsStrictMode, onRestart, isFullScreen }) {
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full mb-4">
      
      {/* LEFT SIDE: LOGO + TITLE */}
      <div className="flex items-center gap-5">
        {/* <img 
            src={logo} 
            alt="CodeTrace Logo" 
            className="h-14 w-auto object-contain drop-shadow-lg" 
        />  */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">transcribe</h1>
          <p className="text-slate-500 text-sm font-bold">
             One Line at a Time
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: CONTROLS */}
      <div className="flex items-center gap-6">
        
        {/* 👇 STRICT MODE TOGGLE: HIDDEN IF FULL SCREEN 👇 */}
        {!isFullScreen && (
            <div className="flex items-center gap-2 mr-4 bg-slate-900 p-1.5 rounded-lg border border-slate-800 animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-2">Strict</span>
            <button 
                onClick={() => { setIsStrictMode(!isStrictMode); onRestart(); }}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isStrictMode ? 'bg-cyan-600' : 'bg-slate-700'}`}
            >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isStrictMode ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
            </div>
        )}

        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-cyan-400">{wpm} <span className="text-sm text-slate-500">WPM</span></div>
          <div className={`text-xs font-bold tracking-widest uppercase ${status === 'running' ? 'text-cyan-600' : 'text-slate-600'}`}>{status}</div>
        </div>
        <button onClick={onRestart} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-md font-medium transition-all border border-slate-700 shadow-lg shadow-black/20">Restart</button>
      </div>
    </nav>
  );
}