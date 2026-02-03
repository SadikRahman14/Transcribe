import React, { useState } from 'react';

export default function CustomCodeModal({ onSave, onCancel }) {
    const [customTitle, setCustomTitle] = useState('');
    const [customCode, setCustomCode] = useState('');

    // --- AUTO-FORMAT LOGIC ---
    const handleAutoFormat = () => {
        if (!customCode) return;

        const lines = customCode.split('\n');
        let formatted = '';
        let indentLevel = 0;
        const indentString = '    '; // 4 spaces

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            // 1. Preserve existing empty lines (Fixes "Packed" look)
            if (!line) {
                // Only add a newline if the previous line wasn't already a blank one
                // (This prevents accidental huge gaps, but ensures at least one blank line stays)
                if (formatted.length > 0 && !formatted.endsWith('\n\n')) {
                    formatted += '\n';
                }
                continue;
            }

            // 2. Decrease Indent for closing brackets or keywords
            if (
                line.startsWith('}') || 
                line.startsWith(']') || 
                line.startsWith(')') ||
                line.startsWith('else') ||
                line.startsWith('case ') ||
                line.startsWith('default:') ||
                line.startsWith('public:') ||
                line.startsWith('private:')
            ) {
                indentLevel = Math.max(0, indentLevel - 1);
            }

            // 3. SMART SPACING (The Fix You Need)
            // Detect "Block Starters" that deserve a blank line before them
            const isStructOrClass = /^(struct|class|enum|union|template)/.test(line);
            const isUsing = line.startsWith('using namespace');
            // Detect functions at root level (e.g., "int main", "void solve")
            const isFunction = indentLevel === 0 && /^(int|void|bool|string|double|long|auto)\s/.test(line) && line.includes('(');
            const isInclude = line.startsWith('#include');

            // Logic: Insert \n if it's a major block and NOT the very first line
            if (formatted.length > 0) {
                // Always Separate 'struct/class', 'using', or 'functions' from previous code
                if (isStructOrClass || isUsing || isFunction) {
                    if (!formatted.endsWith('\n\n')) {
                        formatted += '\n';
                    }
                }
                // Separate #include if the previous line was NOT an #include
                else if (isInclude && !formatted.trim().endsWith('>')) { // weak check, but helps
                    // (Optional: usually includes are grouped, so we leave them tight)
                }
            }

            // 4. Append the actual code line
            formatted += indentString.repeat(indentLevel) + line + '\n';

            // 5. Increase Indent for openers
            if (
                line.endsWith('{') || 
                line.endsWith('[') || 
                line.endsWith('(') || 
                line.endsWith(':')
            ) {
                indentLevel++;
            }
        }

        setCustomCode(formatted);
    };

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
            <style>{`
    .force-white-input {
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        background-color: #020617 !important; /* matches bg-slate-950 */
        line-height: 2 !important; /* FORCE DOUBLE SPACING */
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
                        className="force-white-input w-full bg-slate-950 border border-slate-800 rounded p-3 caret-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                    />
                </div>
                
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Code</label>
                        
                        <button 
                            onClick={handleAutoFormat}
                            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider flex items-center gap-1 transition-colors"
                            title="Fixes indentation for C++, JS, and Python"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            Auto-Indent
                        </button>
                    </div>

                    <textarea 
    value={customCode} 
    onChange={(e) => setCustomCode(e.target.value)} 
    placeholder="Paste your code here..." 
    spellCheck="false"
    // CHANGED: replaced 'leading-relaxed' with '!leading-loose'
    className="force-white-input w-full h-64 bg-slate-950 border border-slate-800 rounded p-3 font-mono text-sm !leading-loose caret-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none custom-scrollbar"
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