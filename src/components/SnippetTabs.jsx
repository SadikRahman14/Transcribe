import React from 'react';

export default function SnippetTabs({ snippets, selectedId, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {snippets.map((snippet) => {
        const isSelected = selectedId === snippet.id;
        
        return (
          <button
            key={snippet.id}
            onClick={() => onSelect(snippet)}
            title={snippet.title} // Shows full title on hover
            className={`
              px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
              border truncate max-w-[140px] select-none
              ${isSelected 
                ? 'bg-cyan-900/30 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-600'
              }
            `}
          >
            {snippet.title}
          </button>
        );
      })}
    </div>
  );
}