import React from 'react';

export default function ResultsModal({ wpm, accuracy, analysisResult, onClose, onRetry }) {
  const { errors, warnings } = analysisResult;
  const hasIssues = errors.length > 0 || warnings.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete</h2>
                  <h3 className="text-3xl font-bold text-white mb-2"> The errors are shown under </h3>
                <div className="flex justify-center gap-4 mt-4">
                    <div className="bg-slate-800 p-3 rounded-lg min-w-[100px]">
                        <div className="text-3xl font-bold text-cyan-400">{wpm}</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">WPM</div>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg min-w-[100px]">
                        <div className={`text-3xl font-bold ${accuracy >= 95 ? 'text-green-400' : accuracy >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy}%</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">Accuracy</div>
                    </div>
                </div>
            </div>

            {hasIssues ? (
                <div className="flex-1 overflow-auto custom-scrollbar bg-slate-950 rounded-lg p-4 border border-slate-800 mb-6">
                    {/* RED ERRORS */}
                    {errors.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 sticky top-0 bg-slate-950 pb-2 border-b border-slate-800 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Code Errors ({errors.length})
                            </h3>
                            {errors.map((err, idx) => (
                                <div key={idx} className="bg-slate-900/50 p-3 rounded border border-red-900/30 mb-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-red-400 uppercase">Line {err.line}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
                                        <div><span className="text-slate-500 text-xs block mb-1">Expected:</span><div className="text-green-300 bg-green-950/20 p-1">{err.expected}</div></div>
                                        <div><span className="text-slate-500 text-xs block mb-1">You Typed:</span><div className="text-red-300 bg-red-950/20 p-1">{err.actual}</div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* YELLOW WARNINGS */}
                    {warnings.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-4 sticky top-0 bg-slate-950 pb-2 border-b border-slate-800 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Indentation Warnings ({warnings.length})
                            </h3>
                            {warnings.map((warn, idx) => (
                                <div key={idx} className="bg-slate-900/50 p-3 rounded border border-yellow-900/30 flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-yellow-500 uppercase">Line {warn.line}</span>
                                    <span className="text-sm text-slate-400">Code logic correct, check spacing.</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-green-900/20 border border-green-900 text-green-400 p-4 rounded-lg text-center mb-6">Perfect! No errors.</div>
            )}

            <div className="flex gap-4 justify-center mt-auto pt-4 border-t border-slate-800">
                <button onClick={onClose} className="px-6 py-2 rounded-lg font-bold text-slate-300 hover:bg-slate-800">Close</button>
                <button onClick={onRetry} className="px-6 py-2 rounded-lg font-bold bg-cyan-600 hover:bg-cyan-500 text-white">Try Again</button>
            </div>
        </div>
    </div>
  );
}