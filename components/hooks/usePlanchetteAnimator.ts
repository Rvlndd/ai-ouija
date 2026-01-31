"use client";

import { Position, Rotation, GET_ID_FOR_CHAR } from "@/types/ouija";

export const usePlanchetteAnimator = (
    boardRef: React.RefObject<HTMLDivElement | null>,
    lastPositionRef: React.MutableRefObject<Position>,
    setPlanchettePosition: React.Dispatch<React.SetStateAction<Position>>,
    setRotation: React.Dispatch<React.SetStateAction<Rotation>>,
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>,
    playSlideSound: () => void,
    stopSlideSound: () => void
) => {
    const getElementCoords = (id: string) => {
        if (!boardRef.current) return null;
        const element = document.getElementById(id);
        if (!element) return null;

        const boardRect = boardRef.current.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        const centerX = elementRect.left + elementRect.width / 2;
        const centerY = elementRect.top + elementRect.height / 2;

        return {
            x: ((centerX - boardRect.left) / boardRect.width) * 100,
            y: ((centerY - boardRect.top) / boardRect.height) * 100
        };
    };

    const movePlanchetteTo = async (target: Position, speed = 1000) => {
        playSlideSound();

        return new Promise<void>((resolve) => {
            const startX = lastPositionRef.current.x;
            const startY = lastPositionRef.current.y;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / speed, 1);

                const ease = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                const currentX = startX + (target.x - startX) * ease;
                const currentY = startY + (target.y - startY) * ease;

                const jitterFreq = currentTime / 50;
                const jitter = (Math.sin(jitterFreq) * 0.4) + (Math.random() - 0.5) * 0.2;

                setPlanchettePosition({ x: currentX + jitter, y: currentY + jitter });

                const vx = currentX - lastPositionRef.current.x;
                const vy = currentY - lastPositionRef.current.y;
                setRotation({
                    x: Math.max(-15, Math.min(15, -vy * 12)),
                    y: Math.max(-15, Math.min(15, vx * 12)),
                    z: Math.max(-10, Math.min(10, vx * 5))
                });

                lastPositionRef.current = { x: currentX, y: currentY };

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    stopSlideSound();
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    };

    const animateSpiritResponse = async (text: string) => {
        setIsAnimating(true);
        const cleanText = text.toUpperCase().trim();

        if (cleanText === "YES" || cleanText === "NO" || cleanText === "UNCLEAR") {
            const id = GET_ID_FOR_CHAR(cleanText);
            const coord = getElementCoords(id);
            if (coord) {
                await movePlanchetteTo(coord, 1500);
                await new Promise(r => setTimeout(r, 1000));
            }
        } else {
            const chars = cleanText.split("");
            for (const char of chars) {
                const id = GET_ID_FOR_CHAR(char);
                const coord = getElementCoords(id);
                if (coord) {
                    await movePlanchetteTo(coord, 1200);
                    await new Promise(r => setTimeout(r, 600));
                }
            }
        }

        await movePlanchetteTo({ x: 50, y: 50 }, 2000);
        setIsAnimating(false);
    };

    return {
        animateSpiritResponse
    };
};
