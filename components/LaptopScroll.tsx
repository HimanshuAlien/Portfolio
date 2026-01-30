"use client";

import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

export default function LaptopScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll progress for the entire container
    // Mobile: shorter scroll (500vh) to make it faster to scrub through
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress to frame index (0 to 143)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 143]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const totalFrames = 144;

            const promises = Array.from({ length: totalFrames }).map((_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = `/frames/frame_${(i + 1).toString().padStart(3, "0")}.jpg`;
                    img.onload = () => resolve(img);
                    img.onerror = (e) => {
                        console.error("Failed to load image", i, e);
                        resolve(img);
                    };
                });
            });

            try {
                const results = await Promise.all(promises);
                setImages(results);
                setIsLoaded(true);
            } catch (error) {
                console.error("Error loading frames:", error);
            }
        };

        loadImages();
    }, []);

    // Draw to canvas on scroll change
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Function to simulate object-fit: cover or contain based on screen size
        const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = img.width;
            const imgHeight = img.height;

            // Use 'contain' for mobile (width < 768) to prevent cropping
            // Use 'cover' for desktop for immersive effect
            const isMobile = window.innerWidth < 768;

            let ratio;
            if (isMobile) {
                // Contain: Fit the entire image within the canvas
                // Zoom in slightly (1.2x) on mobile to minimize borders
                ratio = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight) * 1.2;
            } else {
                // Cover: Fill the canvas
                ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
            }

            const centerShift_x = (canvasWidth - imgWidth * ratio) / 2;
            const centerShift_y = (canvasHeight - imgHeight * ratio) / 2;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(
                img,
                0,
                0,
                imgWidth,
                imgHeight,
                centerShift_x,
                centerShift_y,
                imgWidth * ratio,
                imgHeight * ratio
            );
        };

        const render = (index: number) => {
            const clampedIndex = Math.min(
                143,
                Math.max(0, Math.round(index))
            );
            const img = images[clampedIndex];
            if (img) {
                // Ensure smoothness
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                drawImageProp(ctx, img);
            }
        };

        // Handle resizing
        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            // Re-render current frame after resize
            render(frameIndex.get());
        };

        // Initial setup
        handleResize();
        window.addEventListener("resize", handleResize);

        // Subscribe to scroll updates
        const unsubscribe = frameIndex.on("change", (latest) => {
            requestAnimationFrame(() => render(latest));
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, [isLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh] md:h-[800vh] bg-[#050505]">
            {/* Loading Screen */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                            <p className="text-sm font-light text-white/50 tracking-widest uppercase">
                                Loading Experience
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                />
            </div>

        </div>
    );
}
