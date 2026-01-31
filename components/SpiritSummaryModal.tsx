"use client";

import React from "react";
import { DeadPerson } from "@/types/ouija";

interface SpiritSummaryModalProps {
    deadPerson: DeadPerson;
    onClose: () => void;
}

const SpiritSummaryModal: React.FC<SpiritSummaryModalProps> = ({ deadPerson, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-80 overflow-y-auto bg-black/95 backdrop-blur-md animate-in fade-in duration-700"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' } as React.CSSProperties}
        >
            <div className="flex min-h-full items-center justify-center p-4 md:p-12 text-center">
                <div className="max-w-6xl w-full border border-amber-900/20 p-8 md:p-20 rounded-4xl bg-stone-950 shadow-[0_0_100px_rgba(0,0,0,1),inset_0_0_40px_rgba(120,80,40,0.05)] relative my-8 text-left transform transition-all">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-6 text-amber-500/40 font-serif text-[11px] tracking-[0.5em] uppercase whitespace-nowrap border-x border-amber-900/30">
                        Rest In Peace
                    </div>

                    <header className="text-center mb-16 pb-12 border-b border-amber-900/10">
                        <h1 className="text-5xl md:text-8xl font-serif text-amber-100/90 mb-6 tracking-tight leading-none">
                            {deadPerson.full_name}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-amber-500/60 font-serif italic text-lg md:text-xl tracking-[0.2em]">
                            <div className="h-px w-12 bg-amber-900/30" />
                            <span>{deadPerson.birth.year} — {deadPerson.death.year}</span>
                            <div className="h-px w-12 bg-amber-900/30" />
                        </div>
                    </header>

                    <div className="font-serif relative after:content-[''] after:table after:clear-both">
                        <aside className="lg:float-left lg:w-1/3 lg:mr-16 lg:mb-12 mb-12 space-y-12 lg:border-r lg:border-amber-900/10 lg:pr-12">
                            <div className="space-y-2">
                                <h3 className="text-xs uppercase tracking-[0.3em] text-amber-500/30 mb-4">Origins</h3>
                                <div className="space-y-1">
                                    <p className="text-amber-100/80 text-xl font-light">{deadPerson.birth.city}</p>
                                    <p className="text-amber-500/50 text-sm tracking-widest uppercase">{deadPerson.birth.country}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs uppercase tracking-[0.3em] text-amber-500/30 mb-4">The Departure</h3>
                                <div className="space-y-1">
                                    <p className="text-amber-100/80 text-xl font-light">Aged {deadPerson.death.age} years</p>
                                    <p className="text-amber-500/50 text-sm tracking-widest uppercase">{deadPerson.death.place}</p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-amber-900/10">
                                <h3 className="text-xs uppercase tracking-[0.2em] text-amber-500/30 mb-4">The Final Moment</h3>
                                <p className="text-base leading-relaxed text-amber-200/40 font-light italic">
                                    {deadPerson.death.cause}. {deadPerson.death.circumstances}
                                </p>
                            </div>
                        </aside>

                        <div className="relative pt-4">
                            <span className="absolute -left-6 -top-8 text-7xl md:text-8xl lg:text-9xl text-amber-900/3 font-serif select-none pointer-events-none">"</span>
                            <div className="relative z-10">
                                <h3 className="text-xs uppercase tracking-[0.4em] text-amber-600/40 mb-8 border-l-2 border-amber-900/30 pl-4">Life's Narrative</h3>
                                <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.6] text-amber-100/90 italic font-light antialiased">
                                    {deadPerson.short_life_summary}
                                </p>
                            </div>
                            <span className="absolute right-0 -bottom-16 text-7xl md:text-8xl lg:text-9xl text-amber-900/3 font-serif select-none pointer-events-none translate-y-4">"</span>
                        </div>
                    </div>

                    <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-8">
                        <button
                            onClick={onClose}
                            className="group relative py-4 px-12 transition-all duration-700"
                        >
                            <span className="text-amber-500/40 group-hover:text-amber-200 font-serif text-sm tracking-[0.5em] uppercase transition-colors duration-700">
                                Back To Board
                            </span>
                        </button>

                        <a
                            href='https://ko-fi.com/M4M7YKEJR'
                            target='_blank'
                            rel='noopener noreferrer'
                            className="hover:scale-105 transition-transform duration-300 opacity-80 hover:opacity-100"
                        >
                            <img
                                height='40'
                                style={{ border: '0px', height: '40px' }}
                                src='https://storage.ko-fi.com/cdn/kofi6.png?v=6'
                                alt='Buy Me a Coffee at ko-fi.com'
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpiritSummaryModal;
