'use client';

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface BackgroundMusicHandle {
    play: () => Promise<void>;
    switchToSad: () => void;
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle>((props, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [src, setSrc] = useState("/ambient2.mp3");

    useImperativeHandle(ref, () => ({
        play: async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                } catch (error) {
                    console.error("Manual playback failed:", error);
                }
            }
        },
        switchToSad: () => {
            setSrc("/sad.mp3");
        }
    }));

    useEffect(() => {
        if (audioRef.current && src === "/sad.mp3") {
            audioRef.current.load();
            audioRef.current.play().catch(e => console.error("Playback failed after source change:", e));
        }
    }, [src]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 1;
    }, []);

    return (
        <audio
            ref={audioRef}
            src={src}
            loop
            preload="auto"
        />
    );
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;
