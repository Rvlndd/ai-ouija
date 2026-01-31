"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import BoardBackground from "./BoardBackground";
import Planchette from "./Planchette";
import BackgroundMusic, { BackgroundMusicHandle } from "./BackgroundMusic";

// comp
import SpiritSummaryModal from "./SpiritSummaryModal";
import EndSessionModal from "./EndSessionModal";
import EnterOverlay from "./EnterOverlay";
import TranscriptionBar from "./TranscriptionBar";

// hooks
import { useSlideAudio } from "./hooks/useSlideAudio";
import { usePlanchettePhysics } from "./hooks/usePlanchettePhysics";
import { usePlanchetteAnimator } from "./hooks/usePlanchetteAnimator";
import { useSpiritSession } from "./hooks/useSpiritSession";

const OuijaBoard: React.FC = () => {
    // refs
    const boardRef = useRef<HTMLDivElement | null>(null);
    const musicRef = useRef<BackgroundMusicHandle | null>(null);

    // hooks
    const { playSlideSound, stopSlideSound } = useSlideAudio();

    const [isAnimating, setIsAnimating] = useState(false);

    // physiscs
    const {
        planchettePosition,
        rotation,
        isDragging,
        setIsDragging,
        lastPosition,
        handlers,
        setPlanchettePosition,
        setRotation
    } = usePlanchettePhysics(boardRef, isAnimating);

    // animation
    const {
        animateSpiritResponse
    } = usePlanchetteAnimator(
        boardRef,
        lastPosition,
        setPlanchettePosition,
        setRotation,
        setIsAnimating,
        playSlideSound,
        stopSlideSound
    );

    // session
    const {
        deadPerson,
        hasEntered,
        setHasEntered,
        transcription,
        isTranscribing,
        showEndConfirmation,
        setShowEndConfirmation,
        showSummary,
        setShowSummary,
        vad
    } = useSpiritSession(
        isAnimating,
        planchettePosition,
        boardRef,
        animateSpiritResponse
    );

    // play/stop sound based on drag and animation state
    useEffect(() => {
        if (isDragging) {
            playSlideSound();
        } else if (!isAnimating) {
            stopSlideSound();
        }
    }, [isDragging, isAnimating, playSlideSound, stopSlideSound]);

    return (
        <div className="flex justify-center items-center min-h-screen p-4 md:p-8 relative" style={{ backgroundColor: '#000' }}>
            {/* when planchette is on the goodbye text for 5s it will show this modal */}
            {showEndConfirmation && !showSummary && (
                <EndSessionModal
                    onConfirm={() => {
                        setShowSummary(true);
                        setShowEndConfirmation(false);
                        musicRef.current?.switchToSad();
                    }}
                    onCancel={() => setShowEndConfirmation(false)}
                />
            )}

            {/* this is the summary modal */}
            {showSummary && deadPerson && (
                <SpiritSummaryModal
                    deadPerson={deadPerson}
                    onClose={() => window.location.reload()}
                />
            )}

            {/* this is the overlay when you first enter */}
            {(!deadPerson || !hasEntered) && (
                <EnterOverlay
                    deadPerson={deadPerson}
                    onEnter={async () => {
                        setHasEntered(true);
                        if (musicRef.current) {
                            await musicRef.current.play();
                        }
                    }}
                />
            )}

            {/* when mic error */}
            {!!vad.errored && (
                <div className="absolute inset-0 z-60 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
                    <div className="flex flex-col items-center text-amber-100/80 text-center space-y-4 p-6">
                        <p className="font-serif tracking-widest text-lg text-red-500/80">SILENCE DETECTED</p>
                        <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
                            Microphone access is required to communicate.
                            <br />
                            <span className="text-xs opacity-60 mt-2 block">Please allow access in your browser settings.</span>
                        </p>
                    </div>
                </div>
            )}

            <div
                ref={boardRef}
                className="relative w-full max-w-[900px] aspect-[1.5/1] rounded-2xl select-none z-10 shadow-2xl overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, #916D5A 0%, #7A5C4A 15%, #85634F 30%, #6B4F3D 45%, #7A5C4A 60%, #916D5A 75%, #6B4F3D 90%, #85634F 100%)`,
                    boxShadow: `0 30px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 2px 4px rgba(200, 180, 160, 0.2)`,
                }}
                onMouseMove={handlers.handleMouseMove}
                onTouchMove={handlers.handleTouchMove}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchEnd={() => setIsDragging(false)}
            >
                {/* show transcription from whisper */}
                <TranscriptionBar
                    transcription={transcription}
                    isTranscribing={isTranscribing}
                    isListening={vad.listening}
                    isAnimating={isAnimating}
                />

                <BoardBackground />

                <Planchette
                    x={planchettePosition.x}
                    y={planchettePosition.y}
                    rotation={rotation}
                    isDragging={isDragging}
                    onMouseDown={handlers.onMouseDown}
                    onTouchStart={handlers.onTouchStart}
                />
            </div>

            {/* mic button on/mute */}
            <button
                onClick={() => vad.toggle()}
                disabled={!deadPerson || !hasEntered}
                className={`absolute top-4 left-4 p-3 rounded-full transition-all duration-500 shadow-xl backdrop-blur-sm border z-50 ${!deadPerson || !hasEntered
                    ? "opacity-0 pointer-events-none"
                    : vad.listening
                        ? "bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-300"
                        : "bg-white/5 border-white/20 hover:bg-white/10 text-white/50 hover:text-white"
                    }`}
            >
                {vad.listening ? (
                    <Mic className="w-5 h-5 animate-pulse" />
                ) : (
                    <MicOff className="w-5 h-5" />
                )}
            </button>
            <BackgroundMusic ref={musicRef} />
        </div>
    );
};

export default OuijaBoard;