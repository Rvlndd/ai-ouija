"use client";

import React from "react";
import { X } from "lucide-react";

interface HowToPlayModalProps {
    onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
    const steps = [
        {
            title: "The Invocation",
            description: "Once you enter the board, say : 'Is there any spirit who wants to communicate with us?' A presence will be drawn to your call. Remain calm.",
            color: "text-amber-700/60"
        },
        {
            title: "Communion",
            description: "Speak your questions clearly. The spirits hear your voice. Be direct, but never provoke.",
            color: "text-amber-600/70"
        },
        {
            title: "Guidance",
            description: "Watch the planchette. The spirit will guide it across the letters to spell its message or point to YES and NO.",
            color: "text-amber-500/80"
        },
        {
            title: "The Farewell",
            description: "To end the session, you must drag the planchette to 'GOOD BYE' and leave it there for 5 Seconds. Never leave without saying goodbye, or the door remains open.",
            color: "text-stone-500 italic"
        }
    ];

    return (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-500 px-6">
            <div className="relative max-w-2xl w-full bg-stone-950 border border-amber-900/20 p-8 md:p-12 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,1),inset_0_0_40px_rgba(120,80,40,0.03)] text-left space-y-10 overflow-y-auto max-h-[90vh]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-stone-600 hover:text-amber-500 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <header className="text-center space-y-2">
                    <h2 className="text-4xl font-serif text-amber-500 tracking-[0.3em] uppercase">
                        The Ritual
                    </h2>
                    <p className="text-stone-600 text-[10px] tracking-[0.4em] uppercase font-serif">A Guide for the Living</p>
                </header>

                <div className="grid gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-6 group">
                            <span className="text-amber-900/20 font-serif text-4xl select-none group-hover:text-amber-900/40 transition-colors duration-700">
                                0{index + 1}
                            </span>
                            <div className="space-y-2">
                                <h3 className={`uppercase tracking-widest text-xs font-serif ${step.color}`}>
                                    {step.title}
                                </h3>
                                <p className="text-stone-400 font-serif leading-relaxed text-sm md:text-base antialiased">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-amber-900/10 text-center">
                    <button
                        onClick={onClose}
                        className="group relative inline-flex flex-col items-center gap-2 py-2 px-12"
                    >
                        <span className="text-amber-500/40 group-hover:text-amber-200 font-serif text-xs tracking-[0.5em] uppercase transition-all duration-700">
                            I Am Ready
                        </span>
                        <div className="h-px w-12 bg-amber-900/30 group-hover:w-32 group-hover:bg-amber-500/30 transition-all duration-1000 ease-out" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowToPlayModal;
