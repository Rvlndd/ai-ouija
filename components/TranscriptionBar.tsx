"use client";

import React from "react";

interface TranscriptionBarProps {
    transcription: string;
    isTranscribing: boolean;
    isListening: boolean;
    isAnimating: boolean;
}

const TranscriptionBar: React.FC<TranscriptionBarProps> = ({
    transcription,
    isTranscribing,
    isListening,
    isAnimating
}) => {
    if (!transcription && !isTranscribing && !isListening && !isAnimating) return null;

    return (
        <div className="absolute top-[2%] left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-[500px]">
            <div className="bg-black/40 backdrop-blur-sm px-5 py-3 rounded-2xl text-white/90 border border-amber-900/30 shadow-lg text-center">
                {isTranscribing ? (
                    <span className="text-amber-200/80 text-sm font-medium tracking-widest">
                        <span className="mx-2 opacity-70">??????</span>
                        <span className="inline-flex gap-[2px]">
                            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                        </span>
                    </span>
                ) : isListening && !transcription ? (
                    <span className="text-amber-100 animate-pulse text-sm font-medium">you can start speaking</span>
                ) : (
                    <span className="italic text-sm md:text-base text-amber-100 leading-relaxed">"{transcription}"</span>
                )}
            </div>
        </div>
    );
};

export default TranscriptionBar;
