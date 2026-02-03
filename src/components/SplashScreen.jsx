import React, { useEffect, useState } from 'react';
import littleTLogo from '../assets/LittleT.png'; // 👈 Import your image here

export default function SplashScreen({ onComplete }) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // 1. Keep the splash screen for 2 seconds
        const timer = setTimeout(() => {
            setFadeOut(true); 
        }, 2000);

        // 2. Remove component after fade-out
        const removeTimer = setTimeout(() => {
            onComplete();
        }, 2700);

        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, [onComplete]);

    return (
        <div 
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-700 ease-in-out ${
                fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <div className="text-center flex flex-col items-center">
                {/* 👇 REPLACED TEXT WITH IMAGE 👇 */}
                <img 
                    src={littleTLogo} 
                    alt="Transcribe Logo" 
                    className="w-24 md:w-32 mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                />

                <p className="text-slate-500 tracking-[0.5em] text-sm uppercase font-medium">
                    One Line at a Time
                </p>
                
                {/* Loading Bar */}
                <div className="mt-8 w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
                </div>
            </div>

            <style>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}