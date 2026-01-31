"use client";

import React, { useState } from "react";
import { DeadPerson } from "@/types/ouija";
import HowToPlayModal from "./HowToPlayModal";

interface EnterOverlayProps {
    deadPerson: DeadPerson | null;
    onEnter: () => void;
}

const EnterOverlay: React.FC<EnterOverlayProps> = ({ deadPerson, onEnter }) => {
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    return (
        <div className="absolute inset-0 z-60 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md px-6 text-center transition-opacity duration-1000">
            {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
            {!deadPerson ? (
                <div className="flex flex-col items-center space-y-6 max-w-md">
                    {/* Title */}
                    <h1 className="font-serif text-3xl text-amber-600 tracking-widest">
                        AIOUIJA
                    </h1>

                    {/* Loading dots */}
                    <span className="inline-flex gap-[4px] text-2xl text-amber-700">
                        <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                    </span>

                    {/* Description */}
                    <p className="text-stone-400 text-sm font-serif leading-relaxed">
                        Please remain calm and keep your intentions clear.
                    </p>

                    <p className="text-stone-600 text-xs italic">
                        Some spirits take longer to respond.
                    </p>

                    <button
                        onClick={() => setShowHowToPlay(true)}
                        className="text-amber-700/60 hover:text-amber-500/80 font-serif text-[10px] tracking-widest uppercase border-b border-amber-900/20 pb-1 px-4 transition-colors"
                    >
                        How to Play
                    </button>

                    {/* Footer */}
                    <div className="pt-6 flex flex-col items-center text-stone-500 text-xs space-y-1">
                        <p className="font-serif">Aiouija is a project by RvLnd</p>
                        <a
                            href="https://github.com/Rvlndd/ai-ouija"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-600 transition-colors font-mono"
                        >
                            github.com/Rvlndd/ai-ouija
                        </a>
                        <a
                            href="https://ko-fi.com/rvlnd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-600 transition-colors font-mono"
                        >
                            ko-fi.com/rvlnd
                        </a>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700 space-y-8 max-w-md">


                    {/* Warning text */}
                    <p className="text-stone-500 text-xs italic max-w-sm">
                        Do not mock. Do not provoke. Ask clearly, and wait patiently. Keep your mind steady, your intentions respectful, and your words deliberate. Once the board is opened, not everything that answers is easily dismissed.
                    </p>

                    {/* Enter Button */}
                    <div className="flex flex-col items-center space-y-4">
                        <button
                            onClick={onEnter}
                            className="text-amber-500 hover:text-amber-200 font-serif text-xl tracking-[0.2em] uppercase underline underline-offset-8 decoration-amber-900/50 hover:decoration-amber-200/50 transition-all duration-500 hover:scale-105"
                        >
                            Enter the Board
                        </button>

                        <button
                            onClick={() => setShowHowToPlay(true)}
                            className="text-yellow-500/30 hover:text-stone-300 font-serif text-[10px] tracking-widest uppercase transition-colors"
                        >
                            Guide Of How To Play
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 flex flex-col items-center text-stone-600 text-xs space-y-1 font-serif">
                        <p>Aiouija is a project by RvLnd</p>
                        <a
                            href="https://github.com/Rvlndd/ai-ouija"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-600 transition-colors font-mono"
                        >
                            github.com/Rvlndd/ai-ouija
                        </a>
                        <a
                            href="https://ko-fi.com/rvlnd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-600 transition-colors font-mono"
                        >
                            ko-fi.com/rvlnd
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnterOverlay;
