import React, { useState } from 'react';

export default function CustomCodeModal({ onSave, onCancel }) {
    const [customTitle, setCustomTitle] = useState('');
    const [customCode, setCustomCode] = useState('');

    const handleSave = () => {
        if (!customCode.trim()) return;
        
        const newSnippet = {
            id: Date.now().toString(),
            lang: 'Custom',
            label: customTitle || 'My Snippet',
            code: customCode
        };
        
        onSave(newSnippet);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            {/* 1. INTERNAL STYLE TAG TO FORCE OVERRIDE */}
            <style>{`
                .force-white-input {
                    color: #ffffff !important;
                    -webkit-text-fill-color: #ffffff !important;
                    background-color: #020617 !important; /* matches bg-slate-950 */
                }
            `}</style>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg w-full max-w-2xl shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Add Custom Snippet</h2>
                
                <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Title</label>
                    <input 
                        type="text" 
                        value={customTitle} 
                        onChange={(e) => setCustomTitle(e.target.value)} 
                        placeholder="e.g. My Dijkstra Algo" 
                        // Added 'force-white-input' class and 'caret-white'
                        className="force-white-input w-full bg-slate-950 border border-slate-800 rounded p-3 caret-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Code</label>
                    <textarea 
                        value={customCode} 
                        onChange={(e) => setCustomCode(e.target.value)} 
                        placeholder="Paste your code here..." 
                        spellCheck="false"
                        // Added 'force-white-input' class and 'caret-white'
                        className="force-white-input w-full h-64 bg-slate-950 border border-slate-800 rounded p-3 font-mono text-sm caret-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none custom-scrollbar"
                    />
                </div>
                
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onCancel} 
                        className="px-4 py-2 text-slate-400 hover:text-white transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave} 
                        disabled={!customCode.trim()} 
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Use This Code
                    </button>
                </div>
            </div>
        </div>
    );
}