import React from "react";

const BoardBackground: React.FC = () => {
    const numbers = "1234567890".split("");

    return (
        <>
            <svg width="0" height="0" className="absolute">
                <filter id="woodNoise" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" result="noise" />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4" />
                    </feComponentTransfer>
                </filter>
                <filter id="crackDisplace">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>

            {/* wood grain texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-90"
                style={{
                    background: `repeating-linear-gradient(92deg, transparent 0px, rgba(0, 0, 0, 0.08) 1px, transparent 2px, transparent 15px),
          repeating-linear-gradient(88deg, transparent 0px, rgba(40, 20, 10, 0.15) 2px, transparent 4px, transparent 30px)`
                }}
            />

            {/* dirty/worn patches for that vintage vibe */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
                style={{
                    background: `
                        radial-gradient(circle at 15% 25%, rgba(20,10,5, 0.6) 0%, transparent 50%),
                        radial-gradient(circle at 85% 75%, rgba(20,10,5, 0.5) 0%, transparent 45%),
                        radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(10,5,0, 0.4) 90%)
                    `
                }}
            />

            {/* scratches */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                    background: `
                        repeating-linear-gradient(45deg, transparent 0px, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px, transparent 3px, transparent 50px),
                        repeating-linear-gradient(-25deg, transparent 0px, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px, transparent 4px, transparent 60px)
                    `,
                    maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                }}
            />

            {/* noise grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-50 mix-blend-soft-light"
                style={{ filter: 'url(#woodNoise)' }}
            />

            {/* grime speckles */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                    filter: 'contrast(200%) brightness(70%) sepia(80%)'
                }}
            />

            {/* edge darkness */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.5)] mix-blend-multiply" />

            {/* damage spots */}
            <div className="absolute top-[12%] left-[22%] w-24 h-24 bg-[#050200] rounded-full blur-2xl pointer-events-none mix-blend-multiply opacity-90" />
            <div className="absolute bottom-[20%] right-[30%] w-32 h-16 bg-[#1a0500] rounded-full blur-xl pointer-events-none mix-blend-multiply opacity-80" />
            <div className="absolute top-[5%] right-[50%] w-40 h-24 bg-black/40 blur-3xl pointer-events-none mix-blend-multiply" />

            <div className="absolute inset-3 border-[3px] border-[#2a1a0a] rounded-xl pointer-events-none" />
            <div className="absolute inset-5 border border-[#2a1a0a]/50 rounded-lg pointer-events-none" />

            {/* corner decorations */}
            {[
                { pos: "top-6 left-6", transform: "scale(1, 1)" },
                { pos: "top-6 right-6", transform: "scale(-1, 1)" },
                { pos: "bottom-6 left-6", transform: "scale(1, -1)" },
                { pos: "bottom-6 right-6", transform: "scale(-1, -1)" },
            ].map((corner, i) => (
                <div key={i} className={`absolute ${corner.pos} w-[60px] h-[60px] text-[#2a1a0a] pointer-events-none`} style={{ transform: corner.transform }}>
                    <svg viewBox="0 0 60 60" className="w-full h-full">
                        <path d="M5 30 Q5 5 30 5" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="15" cy="15" r="3" fill="currentColor" />
                        <path d="M10 25 Q10 10 25 10" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </div>
            ))}

            <div className="absolute top-[8%] left-[8%] flex flex-col items-center">
                <img
                    src="/sun.png"
                    alt="Sun"
                    className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain mix-blend-multiply opacity-80"
                />
                <span id="ouija-yes" className="font-serif text-sm md:text-base font-bold tracking-[2px] text-[#2a1a0a]" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>YES</span>
            </div>

            <div className="absolute top-[8%] right-[8%] flex flex-col items-center">
                <img
                    src="/moon.png"
                    alt="Moon"
                    className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain mix-blend-multiply opacity-80"
                />
                <span id="ouija-no" className="font-serif text-sm md:text-base font-bold tracking-[2px] text-[#2a1a0a]" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>NO</span>
            </div>

            <div className="absolute bottom-0 left-0">
                <img
                    src="/left.png"
                    alt="Left Decoration"
                    className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] object-contain mix-blend-multiply opacity-90"
                    style={{ transform: "translate(-30%, 30%)" }}
                />
            </div>

            <div className="absolute bottom-0 right-0">
                <img
                    src="/right.png"
                    alt="Right Decoration"
                    className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] object-contain mix-blend-multiply opacity-90"
                    style={{ transform: "translate(30%, 30%)" }}
                />
            </div>

            <div className="absolute top-[10%] left-1/2 -translate-x-1/2">
                <span
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.3em] text-[#2a1a0a]"
                    style={{
                        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                        textShadow: "3px 3px 6px rgba(0,0,0,0.5), -1px -1px 0 rgba(255,200,150,0.1)",
                        fontVariant: "small-caps",
                        letterSpacing: "0.4em"
                    }}
                >
                    OUIJA
                </span>
            </div>

            <svg
                className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[85%] h-[120px] md:h-[160px] overflow-visible"
                viewBox="0 0 800 150"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <path
                        id="arcPath1"
                        d="M 50,130 Q 400,20 750,130"
                        fill="none"
                    />
                </defs>
                <text
                    className="text-[#2a1a0a]"
                    style={{
                        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                        fontWeight: 'bold',
                        fontSize: '56px',
                    }}
                    fill="#2a1a0a"
                >
                    <textPath
                        href="#arcPath1"
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.4))',
                            letterSpacing: '0.25em'
                        }}
                    >
                        {"ABCDEFGHIJKLM".split("").map(char => (
                            <tspan key={char} id={`ouija-char-${char}`}>{char}</tspan>
                        ))}
                    </textPath>
                </text>
            </svg>

            {/* letters N-Z */}
            <svg
                className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[85%] h-[120px] md:h-[160px] overflow-visible"
                viewBox="0 0 800 150"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <path
                        id="arcPath2"
                        d="M 50,130 Q 400,20 750,130"
                        fill="none"
                    />
                </defs>
                <text
                    className="text-[#2a1a0a]"
                    style={{
                        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                        fontWeight: 'bold',
                        fontSize: '56px',
                    }}
                    fill="#2a1a0a"
                >
                    <textPath
                        href="#arcPath2"
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.4))',
                            letterSpacing: '0.25em'
                        }}
                    >
                        {"NOPQRSTUVWXYZ".split("").map(char => (
                            <tspan key={char} id={`ouija-char-${char}`}>{char}</tspan>
                        ))}
                    </textPath>
                </text>
            </svg>

            <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 flex justify-center gap-3 md:gap-6">
                {numbers.map((num) => (
                    <span
                        key={num}
                        id={`ouija-char-${num}`}
                        className="text-lg md:text-3xl font-bold text-[#2a1a0a] hover:text-[#1a0f05] transition-all duration-300"
                        style={{
                            fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
                        }}
                    >
                        {num}
                    </span>
                ))}
            </div>

            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2">
                <span
                    id="ouija-goodbye"
                    className="text-2xl md:text-4xl font-bold tracking-[0.3em] text-[#2a1a0a]"
                    style={{
                        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.4), -1px -1px 0 rgba(255,200,150,0.08)",
                        fontVariant: "small-caps"
                    }}
                >
                    GOOD BYE
                </span>
            </div>

            <div
                className="absolute inset-0 pointer-events-none animate-pulse"
                style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(255, 180, 100, 0.04) 0%, transparent 70%)",
                    animationDuration: "4s"
                }}
            />
        </>
    );
};

export default BoardBackground;
