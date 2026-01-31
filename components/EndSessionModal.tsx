"use client";

import React from "react";

interface EndSessionModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const EndSessionModal: React.FC<EndSessionModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="absolute inset-0 z-70 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
            <h2 className="text-3xl font-serif text-amber-100 mb-8 tracking-widest text-center">
                ARE YOU SURE WANT TO END THIS?
            </h2>
            <div className="flex gap-12">
                <button
                    onClick={onConfirm}
                    className="text-amber-500 hover:text-amber-200 font-serif text-2xl tracking-[0.2em] font-bold uppercase underline underline-offset-8 decoration-amber-900/50 hover:decoration-amber-200/50 transition-all duration-300 transform hover:scale-110"
                >
                    YES
                </button>
                <button
                    onClick={onCancel}
                    className="text-stone-500 hover:text-stone-300 font-serif text-2xl tracking-[0.2em] font-bold uppercase underline underline-offset-8 decoration-stone-900/50 hover:decoration-stone-200/50 transition-all duration-300 transform hover:scale-110"
                >
                    NO
                </button>
            </div>
        </div>
    );
};

export default EndSessionModal;
