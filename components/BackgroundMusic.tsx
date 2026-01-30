"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.4); // Start with lower volume

    useEffect(() => {
        // Attempt auto-play on mount (often blocked, but worth a try with muted)
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.log("Playback prevented:", error);
                    });
            }
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
            <audio
                ref={audioRef}
                src="/bgm.mp3"
                loop
                preload="auto"
                onError={(e) => console.error("Audio playback error:", e)}
            />
            {/* Source: Local User File (bgm.mp3) */}

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 ${isPlaying
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-blue-500/20"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
            >
                {isPlaying ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <Music size={20} />
                    </motion.div>
                ) : (
                    <VolumeX size={20} />
                )}
            </motion.button>
        </div>
    );
}
