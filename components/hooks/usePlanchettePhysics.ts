"use client";

import { useState, useRef, useEffect } from "react";
import { Position, Rotation } from "@/types/ouija";

export const usePlanchettePhysics = (
    boardRef: React.RefObject<HTMLDivElement | null>,
    isAnimating: boolean
) => {
    const [planchettePosition, setPlanchettePosition] = useState<Position>({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 0, z: 0 });

    const lastPosition = useRef<Position>({ x: 50, y: 50 });
    const velocityRef = useRef<Position>({ x: 0, y: 0 });
    const dragOffsetRef = useRef<Position>({ x: 0, y: 0 });

    // Smooth decay animation when you stop dragging
    useEffect(() => {
        if (isDragging || isAnimating) return;

        const decayInterval = setInterval(() => {
            setRotation(prev => {
                const newX = prev.x * 0.90;
                const newY = prev.y * 0.90;
                const newZ = prev.z * 0.90;

                if (Math.abs(newX) < 0.05 && Math.abs(newY) < 0.05 && Math.abs(newZ) < 0.05) {
                    clearInterval(decayInterval);
                    return { x: 0, y: 0, z: 0 };
                }

                return { x: newX, y: newY, z: newZ };
            });
        }, 16);

        return () => clearInterval(decayInterval);
    }, [isDragging, isAnimating]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const board = e.currentTarget.getBoundingClientRect();

        const rawX = ((e.clientX - board.left) / board.width) * 100;
        const rawY = ((e.clientY - board.top) / board.height) * 100;

        const targetX = rawX - dragOffsetRef.current.x;
        const targetY = rawY - dragOffsetRef.current.y;

        const vx = targetX - lastPosition.current.x;
        const vy = targetY - lastPosition.current.y;
        velocityRef.current = { x: vx, y: vy };

        setRotation({
            x: Math.max(-25, Math.min(25, -vy * 4)),
            y: Math.max(-25, Math.min(25, vx * 4)),
            z: Math.max(-30, Math.min(30, vx * 8)),
        });

        lastPosition.current = { x: targetX, y: targetY };
        setPlanchettePosition({
            x: Math.max(5, Math.min(95, targetX)),
            y: Math.max(5, Math.min(95, targetY)),
        });
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const board = e.currentTarget.getBoundingClientRect();

        const rawX = ((touch.clientX - board.left) / board.width) * 100;
        const rawY = ((touch.clientY - board.top) / board.height) * 100;

        const targetX = rawX - dragOffsetRef.current.x;
        const targetY = rawY - dragOffsetRef.current.y;

        const vx = targetX - lastPosition.current.x;
        const vy = targetY - lastPosition.current.y;
        velocityRef.current = { x: vx, y: vy };

        setRotation({
            x: Math.max(-25, Math.min(25, -vy * 4)),
            y: Math.max(-25, Math.min(25, vx * 4)),
            z: Math.max(-30, Math.min(30, vx * 8)),
        });

        lastPosition.current = { x: targetX, y: targetY };
        setPlanchettePosition({
            x: Math.max(5, Math.min(95, targetX)),
            y: Math.max(5, Math.min(95, targetY)),
        });
    };

    const handleDragStart = (clientX: number, clientY: number) => {
        if (!boardRef.current || isAnimating) return;
        const board = boardRef.current.getBoundingClientRect();
        const clickX = ((clientX - board.left) / board.width) * 100;
        const clickY = ((clientY - board.top) / board.height) * 100;

        dragOffsetRef.current = {
            x: clickX - planchettePosition.x,
            y: clickY - planchettePosition.y
        };

        lastPosition.current = { x: planchettePosition.x, y: planchettePosition.y };
        setIsDragging(true);
    };

    const onMouseDown = (e: React.MouseEvent) => {
        handleDragStart(e.clientX, e.clientY);
        e.stopPropagation();
    };

    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches[0]) handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
        e.stopPropagation();
    };

    return {
        planchettePosition,
        setPlanchettePosition,
        isDragging,
        setIsDragging,
        rotation,
        setRotation,
        lastPosition,
        handlers: {
            handleMouseMove,
            handleTouchMove,
            onMouseDown,
            onTouchStart
        }
    };
};
