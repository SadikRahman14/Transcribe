import React, { useState, useEffect } from 'react';
// IMPORT YOUR DATA
import { codeSnippets } from './data/defaultSnippets'; 
import { useTypingGame } from './hooks/useTypingGame';
import Footer from './components/Footer';

// COMPONENTS
import Navbar from './components/Navbar';
import SnippetTabs from './components/SnippetTabs';
import EditorArea from './components/EditorArea';
import ResultsModal from './components/ResultsModal';
import CustomCodeModal from './components/CustomCodeModal';

// LANGUAGE CONFIGURATION
const LANGUAGES = [
  { id: 'cpp', label: 'C / C++', icon: '' },
  { id: 'javascript', label: 'JavaScript', icon: '' },
  { id: 'python', label: 'Python', icon: '' },
];

export default function App() {
  // --- STATE ---
  const [snippetsList, setSnippetsList] = useState(codeSnippets);
  
  // 1. LANGUAGE STATE
  const [activeLanguage, setActiveLanguage] = useState('cpp');

  // 2. FILTER SNIPPETS
  const filteredSnippets = snippetsList.filter(s => s.language === activeLanguage);

  // Initialize selection
  const [selectedSnippet, setSelectedSnippet] = useState(
    codeSnippets.find(s => s.language === 'cpp') || codeSnippets[0]
  );
  
  const [isStrictMode, setIsStrictMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // Focus Mode

  // Modals
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  // Hook
  const game = useTypingGame(selectedSnippet);

  // --- HANDLERS ---
  const handleRestart = () => {
    if(game.resetGame) game.resetGame();
    setShowResultModal(false);
  };

  const handleLanguageChange = (langId) => {
    setActiveLanguage(langId);
    // Auto-select first snippet of new language
    const firstSnippet = snippetsList.find(s => s.language === langId);
    if (firstSnippet) {
        setSelectedSnippet(firstSnippet);
        setTimeout(() => handleRestart(), 0);
    }
  };

  const handleSnippetChange = (snippet) => {
    setSelectedSnippet(snippet);
    setTimeout(() => handleRestart(), 0);
  };

  const handleSubmit = () => {
    const success = game.calculateStats ? game.calculateStats() : true;
    if (success) setShowResultModal(true);
  };

  const handleSaveCustom = (newSnippet) => {
    setSnippetsList([...snippetsList, newSnippet]);
    setSelectedSnippet(newSnippet);
    setShowCustomModal(false);
    handleRestart();
  };

  // --- EFFECT: BROWSER FULL SCREEN ---
  useEffect(() => {
    if (isFullScreen) {
        document.documentElement.requestFullscreen().catch((e) => {
            console.log("Fullscreen denied", e);
        });
    } else {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch((e) => console.log(e));
        }
    }
  }, [isFullScreen]);

  // --- RENDER ---
  return (
    <div className={`min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-900 selection:text-cyan-100 flex flex-col ${!isFullScreen ? 'pb-20' : ''}`}>

      <style>{`
        textarea { color: transparent !important; caret-color: #22d3ee; background: transparent !important; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* =========================================
          VIEW 1: STANDARD MODE (Nav, Tabs, Footer)
         ========================================= */}
      {!isFullScreen && (
        <>
          <Navbar
            wpm={game.wpm}
            status={game.status}
            isStrictMode={isStrictMode}
            setIsStrictMode={setIsStrictMode}
            onRestart={handleRestart}
            isFullScreen={isFullScreen} // Pass prop to Navbar
          />

          <div className="max-w-6xl mx-auto w-full px-4 mb-2 flex flex-col gap-4">
             {/* LANGUAGE BUTTONS */}
             <div className="flex gap-2 justify-center md:justify-start">
                {LANGUAGES.map(lang => (
                    <button
                        key={lang.id}
                        onClick={() => handleLanguageChange(lang.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
                            activeLanguage === lang.id 
                            ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-600 shadow-lg shadow-cyan-900/20' 
                            : 'bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800'
                        }`}
                    >
                        <span>{lang.icon}</span> {lang.label}
                    </button>
                ))}
            </div>

            {/* TABS & CUSTOM BUTTON */}
            <div className="flex items-center justify-between">
                <SnippetTabs
                    snippets={filteredSnippets} 
                    selectedId={selectedSnippet.id}
                    onSelect={handleSnippetChange}
                />
                
                <button onClick={() => setShowCustomModal(true)} className="px-4 w-40 py-2 rounded text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white ml-4 shadow-lg shadow-indigo-900/20">
                    + Custom Code
                </button>
            </div>
          </div>

          {/* ---> NEW: ONE-LINER INSTRUCTION <--- */}
          <div className="max-w-6xl mx-auto w-full px-4 mb-10 mt-10">
            <div className="flex items-center gap-20 opacity-50">
              <div className="h-px bg-slate-800 flex-1"></div>
              <p className="text-slate-100 text-xs font-medium uppercase tracking-widest text-center">
                  Choose a snippet to code or add yours to practice
              </p>
              <div className="h-px bg-slate-800 flex-1"></div>
            </div>
          </div>
        </>
      )}

      {/* =========================================
          VIEW 2: FOCUS MODE HEADER
         ========================================= */}
      {isFullScreen && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur border-b border-slate-800 flex items-center justify-between px-8 z-50 shadow-2xl animate-slideDown">
            <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest text-sm">
                <span>FOCUS MODE</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-1 rounded-full border border-slate-700">
                <span className="text-slate-500 text-xs font-bold">WPM</span>
                <span className="text-xl font-mono text-white">{game.wpm}</span>
            </div>

            <div className="flex items-center gap-6">
                {/* REMOVED: Strict Mode Toggle 
                   REMOVED: The divider line
                */}

                <button 
                    onClick={() => setIsFullScreen(false)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Exit
                </button>
            </div>
        </div>
      )}

      {/* =========================================
          SHARED: EDITOR AREA
         ========================================= */}
      <div className={`
          ${isFullScreen 
            ? 'fixed inset-0 z-40 bg-slate-950 pt-20 px-8 pb-8 flex flex-col' 
            : 'max-w-6xl mx-auto w-full px-4 relative z-0'}
      `}>
          <EditorArea
            selectedSnippet={selectedSnippet}
            userInput={game.userInput}
            inputRef={game.inputRef}
            onKeyDown={(e) => game.handleKeyDown(e, isStrictMode)}
            onChange={(e) => game.handleChange(e, isStrictMode)}
            onSubmit={handleSubmit}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            isStrictMode={isStrictMode}
            errors={game.analysisResult ? game.analysisResult.errors : []}
          />
      </div>

      {/* MODALS */}
      {showCustomModal && <CustomCodeModal onSave={handleSaveCustom} onCancel={() => setShowCustomModal(false)} />}
      
      {showResultModal && (
        <ResultsModal 
            wpm={game.wpm} 
            accuracy={game.accuracy} 
            analysisResult={game.analysisResult} 
            onClose={() => setShowResultModal(false)} 
            onRetry={handleRestart} 
        />
      )}

      {!isFullScreen && <Footer />}
    </div>
  );
}