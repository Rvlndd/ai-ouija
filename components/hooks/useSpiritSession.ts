"use client";

import { useState, useRef, useEffect } from "react";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { DeadPerson, Message, GET_ID_FOR_CHAR } from "@/types/ouija";

export const useSpiritSession = (
    isAnimating: boolean,
    planchettePosition: { x: number, y: number },
    boardRef: React.RefObject<HTMLDivElement | null>,
    animateSpiritResponse: (text: string) => Promise<void>
) => {
    const [deadPerson, setDeadPerson] = useState<DeadPerson | null>(null);
    const [history, setHistory] = useState<Message[]>([]);
    const [hasEntered, setHasEntered] = useState(false);
    const [transcription, setTranscription] = useState<string>("");
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [showEndConfirmation, setShowEndConfirmation] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const closingTimerRef = useRef<number | null>(null);

    useEffect(() => {
        const fetchDeadPerson = async () => {
            try {
                const res = await fetch('/api/deadperson');
                const data = await res.json();
                setDeadPerson(data);
                console.log("Ghost summoned:", data.full_name);
            } catch (err) {
                console.error("Failed to summon ghost", err);
            }
        };
        fetchDeadPerson();
    }, []);

    const vad = useMicVAD({
        startOnLoad: true,
        model: "v5",
        baseAssetPath: "/",
        onnxWASMBasePath: "/",
        ortConfig: (ort) => {
            ort.env.wasm.wasmPaths = "/";
            ort.env.wasm.numThreads = 1;
        },
        onSpeechEnd: async (audio) => {
            if (isAnimating || !deadPerson || !hasEntered) return;

            setIsTranscribing(true);
            const wavBuffer = utils.encodeWAV(audio);
            const blob = new Blob([wavBuffer], { type: "audio/wav" });

            const formData = new FormData();
            formData.append("audio", blob, "voice.wav");

            try {
                const transRes = await fetch("/api/transcribe", {
                    method: "POST",
                    body: formData,
                });
                const transData = await transRes.json();
                const userText = transData.text;

                if (userText) {
                    setTranscription(userText);

                    const ouijaRes = await fetch("/api/ouija", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            deadPerson,
                            message: userText,
                            history
                        })
                    });
                    const ouijaData = await ouijaRes.json();

                    if (ouijaData.response) {
                        setHistory(prev => [
                            ...prev,
                            { role: 'user', content: userText },
                            { role: 'assistant', content: ouijaData.response }
                        ]);

                        animateSpiritResponse(ouijaData.response);
                    }
                }
            } catch (error) {
                console.error("Spiritual connection broken", error);
            } finally {
                setIsTranscribing(false);
            }
        },
    });

    // check distance to GOOD BYE
    useEffect(() => {
        if (!hasEntered || showEndConfirmation || showSummary || !boardRef.current) return;

        const checkGoodBye = () => {
            const goodbyeEl = document.getElementById(GET_ID_FOR_CHAR("GOOD BYE"));
            if (!goodbyeEl || !boardRef.current) return;

            const boardRect = boardRef.current.getBoundingClientRect();
            const goodbyeRect = goodbyeEl.getBoundingClientRect();

            const goodbyeX = ((goodbyeRect.left + goodbyeRect.width / 2 - boardRect.left) / boardRect.width) * 100;
            const goodbyeY = ((goodbyeRect.top + goodbyeRect.height / 2 - boardRect.top) / boardRect.height) * 100;

            const dist = Math.sqrt(
                Math.pow(planchettePosition.x - goodbyeX, 2) +
                Math.pow(planchettePosition.y - goodbyeY, 2)
            );

            if (dist < 10) {
                if (closingTimerRef.current === null) {
                    closingTimerRef.current = Date.now();
                } else if (Date.now() - closingTimerRef.current > 5000) {
                    setShowEndConfirmation(true);
                    closingTimerRef.current = null;
                }
            } else {
                closingTimerRef.current = null;
            }
        };

        const interval = setInterval(checkGoodBye, 500);
        return () => clearInterval(interval);
    }, [planchettePosition, hasEntered, showEndConfirmation, showSummary, boardRef]);

    return {
        deadPerson,
        history,
        hasEntered,
        setHasEntered,
        transcription,
        isTranscribing,
        showEndConfirmation,
        setShowEndConfirmation,
        showSummary,
        setShowSummary,
        vad
    };
};
