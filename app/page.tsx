"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useEffect, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";

const ubuntuBoldItalic = localFont({
    src: "../public/fonts/Ubuntu-BoldItalic.ttf",
    display: "swap",
});

const phrases = [
    "Hoʻomākaukau — we prepare the circle",
    "Hoʻopili — we connect as one",
    "ʻAʻohe hana nui ke alu ʻia — no task is too big when done together",
    "E hoʻomaha — breathe, be present",
];

function DynamicPhrase({ phrases }: { phrases: string[] }) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.p
            key={index}
            className={`text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-100 ${ubuntuBoldItalic.className}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.2 }}
        >
            {phrases[index]}
        </motion.p>
    );
}

export default function Home() {
    return (
        <main className="relative h-screen overflow-hidden bg-black text-white flex flex-col justify-between items-center px-4 py-10">
            {/* 🌌 Star background */}
            <Canvas className="absolute inset-0" camera={{ position: [0, 0, 10], fov: 65 }}>
                <Stars radius={120} depth={60} count={2000} factor={6} fade speed={0.3} />
                <Stars radius={80} depth={20} count={800} factor={3} fade speed={0.8} />
            </Canvas>

            {/* Gradient overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/40 to-cyan-900/20"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% 200%" }}
            />

            {/* Header */}
            <motion.header
                className="z-20 text-center w-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.15em] text-slate-100">
                    Ohana Recovery @ Night
                </h1>
            </motion.header>

            {/* Dynamic phrase (center area) */}
            <motion.section
                className="z-20 flex-1 flex items-center justify-center w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <DynamicPhrase phrases={phrases} />
            </motion.section>

            {/* Meeting notice + logo */}
            <motion.footer
                className="z-20 flex flex-col items-center justify-end w-full space-y-6 pb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1 }}
            >
                <motion.h2
                    className="text-lg sm:text-xl md:text-2xl font-light text-slate-200 tracking-widest uppercase mb-4"
                    animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.03, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    Meeting begins soon 🌙
                </motion.h2>

                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95, rotateY: 0 }}
                    animate={{
                        opacity: 1,
                        scale: [1, 1.02, 1],
                        rotateY: [0, 360],
                    }}
                    transition={{
                        opacity: { duration: 2 },
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                        rotateY: { duration: 50, repeat: Infinity, ease: "linear" },
                    }}
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                    }}
                >
                    <div className="absolute w-[120%] h-[120%] bg-purple-700/10 blur-3xl rounded-full" />
                    <Image
                        src="/OhanaLogoClear.png"
                        alt="Ohana Recovery Logo"
                        width={240}
                        height={240}
                        className="w-32 sm:w-48 md:w-64 lg:w-72 opacity-95"
                        priority
                    />
                </motion.div>
            </motion.footer>

            {/* Subtle fade gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
        </main>
    );
}
