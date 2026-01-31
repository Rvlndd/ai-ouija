import React from "react";

interface PlanchetteProps {
    x: number;
    y: number;
    rotation: { x: number; y: number; z: number };
    isDragging: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
}

const Planchette: React.FC<PlanchetteProps> = ({ x, y, rotation, isDragging, onMouseDown, onTouchStart }) => {
    return (
        <div
            className="absolute z-10 cursor-grab active:cursor-grabbing"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -40.625%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotate(${rotation.z}deg)`,
                transition: isDragging ? "none" : "transform 0.15s ease-out, left 0.05s ease-out, top 0.05s ease-out",
                transformOrigin: "center center",
                perspective: "500px",
                animation: (!isDragging && rotation.x === 0 && rotation.y === 0 && rotation.z === 0) ? "gentleFloat 4s ease-in-out infinite" : "none",
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
        >
            <style>{`
                @keyframes gentleFloat {
                    0%, 100% { transform: translate(-50%, -40.625%) rotate(-0.5deg); }
                    25% { transform: translate(-50%, -40.125%) rotate(0.3deg); }
                    50% { transform: translate(-50%, -41.125%) rotate(0.5deg); }
                    75% { transform: translate(-50%, -40.425%) rotate(-0.3deg); }
                }
                @keyframes microWobble {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    20% { transform: rotate(0.3deg) scale(1.002); }
                    40% { transform: rotate(-0.2deg) scale(0.999); }
                    60% { transform: rotate(0.2deg) scale(1.001); }
                    80% { transform: rotate(-0.3deg) scale(1); }
                }
            `}</style>
            <svg
                width="168"
                height="192"
                viewBox="0 0 140 160"
                className="w-[132px] h-[156px] md:w-[192px] md:h-[222px]"
                style={{
                    filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.7))",
                    animation: "microWobble 2s ease-in-out infinite",
                }}
            >
                <defs>
                    {/* classic heart/teardrop planchette shape */}
                    <path
                        id="heartShape"
                        d="M 70 15 
                           C 45 15 20 35 20 65 
                           C 20 95 45 120 70 150 
                           C 95 120 120 95 120 65 
                           C 120 35 95 15 70 15 Z"
                    />

                    <mask id="planchetteMask">
                        <use href="#heartShape" fill="white" />
                        <circle cx="70" cy="65" r="20" fill="black" />
                    </mask>

                    <linearGradient id="planchetteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#B8967A" />
                        <stop offset="25%" stopColor="#A08060" />
                        <stop offset="50%" stopColor="#8B6B4F" />
                        <stop offset="75%" stopColor="#7A5C42" />
                        <stop offset="100%" stopColor="#5D4532" />
                    </linearGradient>

                    <radialGradient id="agedOverlay" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="rgba(255,220,180,0.15)" />
                        <stop offset="100%" stopColor="rgba(30,15,5,0.3)" />
                    </radialGradient>

                    <filter id="planchetteNoise" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise" />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.25" />
                        </feComponentTransfer>
                        <feBlend in="SourceGraphic" mode="multiply" />
                    </filter>

                    <filter id="innerShadowPlanchette">
                        <feOffset dx="0" dy="4" />
                        <feGaussianBlur stdDeviation="4" result="offset-blur" />
                        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                        <feFlood floodColor="#000" floodOpacity="0.6" result="color" />
                        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                    </filter>

                    <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="100" height="100">
                        <rect width="100" height="100" fill="transparent" />
                        <path d="M0 10 Q25 8 50 12 T100 10" stroke="rgba(40,20,10,0.15)" strokeWidth="1" fill="none" />
                        <path d="M0 25 Q25 22 50 28 T100 25" stroke="rgba(40,20,10,0.12)" strokeWidth="1" fill="none" />
                        <path d="M0 40 Q25 38 50 43 T100 40" stroke="rgba(40,20,10,0.15)" strokeWidth="1" fill="none" />
                        <path d="M0 55 Q25 52 50 58 T100 55" stroke="rgba(40,20,10,0.1)" strokeWidth="1" fill="none" />
                        <path d="M0 70 Q25 68 50 73 T100 70" stroke="rgba(40,20,10,0.14)" strokeWidth="1" fill="none" />
                        <path d="M0 85 Q25 82 50 88 T100 85" stroke="rgba(40,20,10,0.12)" strokeWidth="1" fill="none" />
                    </pattern>
                </defs>

                <g mask="url(#planchetteMask)">
                    <use href="#heartShape" fill="url(#planchetteGrad)" filter="url(#innerShadowPlanchette)" />
                    <use href="#heartShape" fill="url(#woodGrain)" />
                    <use href="#heartShape" fill="url(#agedOverlay)" />
                    <use href="#heartShape" fill="#2a1a0a" fillOpacity="0.2" style={{ filter: "url(#planchetteNoise)" }} />

                    {/* worn spots */}
                    <ellipse cx="30" cy="50" rx="15" ry="20" fill="rgba(20,10,5,0.25)" />
                    <ellipse cx="110" cy="50" rx="15" ry="20" fill="rgba(20,10,5,0.2)" />
                    <ellipse cx="70" cy="135" rx="20" ry="15" fill="rgba(20,10,5,0.3)" />
                </g>

                <use href="#heartShape" fill="none" stroke="#2a1a0a" strokeWidth="4" />
                <use href="#heartShape" fill="none" stroke="rgba(255,200,150,0.1)" strokeWidth="1" transform="translate(-1,-1)" />

                {/* glass viewing window effects */}
                <defs>
                    <radialGradient id="glassGradient" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                        <stop offset="50%" stopColor="rgba(200,220,240,0.03)" />
                        <stop offset="100%" stopColor="rgba(100,120,140,0.05)" />
                    </radialGradient>
                    <radialGradient id="glassReflection" cx="70%" cy="70%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <filter id="glassBlur">
                        <feGaussianBlur stdDeviation="0.8" />
                    </filter>
                </defs>

                <circle cx="70" cy="65" r="19" fill="url(#glassGradient)" />
                <circle cx="70" cy="65" r="19" fill="url(#glassReflection)" />
                <circle cx="70" cy="65" r="18.5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <ellipse cx="62" cy="58" rx="5" ry="3" fill="rgba(255,255,255,0.12)" filter="url(#glassBlur)" />
                <circle cx="60" cy="56" r="1.5" fill="rgba(255,255,255,0.18)" filter="url(#glassBlur)" />

                {/* viewing hole */}
                <circle cx="70" cy="65" r="22" fill="none" stroke="#2a1a0a" strokeWidth="3" />
                <circle cx="70" cy="65" r="20" fill="none" stroke="#2a1a0a" strokeWidth="1.5" />
                <circle cx="70" cy="65" r="24" fill="none" stroke="rgba(255,200,150,0.08)" strokeWidth="1" />

                {/* three little feet */}
                <circle cx="35" cy="45" r="6" fill="#2a1a0a" opacity="0.7" />
                <circle cx="35" cy="45" r="4" fill="#1a0f05" opacity="0.5" />

                <circle cx="105" cy="45" r="6" fill="#2a1a0a" opacity="0.7" />
                <circle cx="105" cy="45" r="4" fill="#1a0f05" opacity="0.5" />

                <circle cx="70" cy="130" r="6" fill="#2a1a0a" opacity="0.7" />
                <circle cx="70" cy="130" r="4" fill="#1a0f05" opacity="0.5" />

                <path
                    d="M 70 25 L 70 40"
                    stroke="#2a1a0a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                />
                <path
                    d="M 70 90 L 70 115"
                    stroke="#2a1a0a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                />

                <circle cx="70" cy="30" r="2" fill="#2a1a0a" opacity="0.6" />
                <circle cx="70" cy="120" r="2" fill="#2a1a0a" opacity="0.6" />

                {/* subtle scratches */}
                <path d="M 45 55 L 50 60" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                <path d="M 90 70 L 95 75" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <path d="M 60 100 L 65 105" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            </svg>
        </div>
    );
};

export default Planchette;
