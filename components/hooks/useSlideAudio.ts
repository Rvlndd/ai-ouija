// this is for the sound of the planchette moving

"use client";

import { useRef, useEffect } from "react";

export const useSlideAudio = () => {
    const slideAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // slide audio
        const audio = new Audio("/slide.mp3");
        audio.volume = 0.4;
        audio.loop = true;
        slideAudioRef.current = audio;

        return () => {
            audio.pause();
            slideAudioRef.current = null;
        };
    }, []);

    const playSlideSound = () => {
        if (!slideAudioRef.current) return;
        if (slideAudioRef.current.paused) {
            slideAudioRef.current.play().catch(() => { });
        }
    };

    const stopSlideSound = () => {
        if (!slideAudioRef.current) return;
        slideAudioRef.current.pause();
        slideAudioRef.current.currentTime = 0;
    };

    return {
        playSlideSound,
        stopSlideSound
    };
};
