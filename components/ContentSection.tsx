"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Trophy, Code2, Cloud, ArrowUpRight, X, Mail, Medal, Award, Crown, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import LeetCodeStats from "./LeetCodeStats";

// Real Logos from Devicon
const TechIcons = {
    HTML: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" fill className="object-contain" />
        </div>
    ),
    CSS: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" fill className="object-contain" />
        </div>
    ),
    JS: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JS" fill className="object-contain" />
        </div>
    ),
    MongoDB: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" fill className="object-contain" />
        </div>
    ),
    React: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" fill className="object-contain" />
        </div>
    ),
    NextJS: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" fill className="object-contain bg-white rounded-full" />
        </div>
    ),
    Python: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" fill className="object-contain" />
        </div>
    ),
    PyTorch: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" fill className="object-contain" />
        </div>
    ),
    Bootstrap: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" fill className="object-contain" />
        </div>
    ),
    Git: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" fill className="object-contain" />
        </div>
    ),
    Bash: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash" fill className="object-contain" />
        </div>
    ),
    NodeJS: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" fill className="object-contain" />
        </div>
    ),
    n8n: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            {/* Using SimpleIcons CDN as reliable alternative */}
            <Image src="https://cdn.simpleicons.org/n8n/FF6E40" alt="n8n" fill className="object-contain" unoptimized />
        </div>
    ),
    Express: (props: any) => (
        <div {...props} style={{ ...props.style, position: "relative" }}>
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" fill className="object-contain bg-white rounded-full p-1" />
        </div>
    )
};

// 3D Card Component for Tools
// Uses Motion Values to track mouse position relative to the card center
// Simplified ToolCard without 3D tilt for performance
const ToolCard = ({ tool, index }: { tool: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="w-24 h-24 md:w-32 md:h-32 relative group"
        >
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-xl group-hover:scale-110">
                <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 rounded-2xl ${tool.color}`} />

                <div className="relative z-10">
                    <tool.Icon className={`w-8 h-8 md:w-12 md:h-12 ${tool.color}`} style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))" }} />
                </div>

                <span className="text-[10px] md:text-sm font-medium text-white/50 group-hover:text-white transition-colors relative z-10">
                    {tool.name}
                </span>
            </div>
        </motion.div>
    );
};

const AchievementCard = ({ item, index, isLast, setSelectedAchievement }: { item: any, index: number, isLast: boolean, setSelectedAchievement: any }) => {
    const [galleryIndex, setGalleryIndex] = React.useState(0);

    const hasGallery = item.subItems && item.subItems.length > 0;
    const currentItem = hasGallery ? item.subItems[galleryIndex] : item;

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasGallery) {
            setGalleryIndex((prev) => (prev + 1) % item.subItems.length);
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (hasGallery) {
            setGalleryIndex((prev) => (prev - 1 + item.subItems.length) % item.subItems.length);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onClick={() => setSelectedAchievement(currentItem)}
            className={`group flex flex-col bg-[#080808] border border-white/10 hover:border-white/30 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.05)] hover:-translate-y-2 h-full ${
                isLast ? "col-span-2" : ""
            }`}
        >
            {/* Padded Image Container for Modern Look */}
            <div className="p-2 md:p-3 pb-0 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={galleryIndex}
                        initial={{ x: 50, opacity: 0, scale: 0.95, skewX: -5 }}
                        animate={{ x: 0, opacity: 1, scale: 1, skewX: 0 }}
                        exit={{ x: -100, opacity: 0, scale: 0.9, skewX: 10 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-[#111] ${
                            isLast ? "h-64 md:h-80" : "h-40 md:h-48"
                        }`}
                    >
                        {currentItem.image ? (
                            <Image
                                src={currentItem.image}
                                alt={currentItem.title}
                                fill
                                className={`${currentItem.image.includes('simpleicons') ? 'object-contain p-8' : 'object-cover md:object-contain'} transition-transform duration-700 group-hover:scale-105`}
                                unoptimized={currentItem.image.endsWith('.gif') || currentItem.image.includes('simpleicons')}
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white/5 to-white/[0.02]">
                                <Medal className="w-12 h-12 text-yellow-500/50 mb-4 opacity-20" />
                                <h5 className="text-sm md:text-xl font-bold text-white/40 uppercase tracking-widest">{currentItem.title}</h5>
                                <p className="text-[10px] md:text-sm text-white/20 mt-2 font-mono">Official Certificate Coming Soon</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        
                        {/* Floating Emoji */}
                        <div className="absolute top-4 left-4 z-20 text-3xl md:text-4xl drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] filter transition-transform duration-300 group-hover:scale-110">
                            {currentItem.emoji || item.emoji}
                        </div>

                        <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Gallery Controls - Desktop Overlay */}
                {hasGallery && (
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 hidden md:flex justify-between z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                            onClick={handlePrev} 
                            className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white pointer-events-auto hover:bg-black/80 transition-all active:scale-90"
                            aria-label="Previous achievement"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={handleNext} 
                            className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white pointer-events-auto hover:bg-black/80 transition-all active:scale-90"
                            aria-label="Next achievement"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
            
            <div className="flex flex-col flex-grow p-4 md:p-6 pt-5">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                        <h4 className="text-lg md:text-2xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                            {currentItem.title}
                        </h4>
                    </div>
                    {hasGallery && (
                        <div className="flex items-center gap-3 ml-4">
                            {/* Mobile Controls */}
                            <div className="flex md:hidden items-center gap-2">
                                <button 
                                    onClick={handlePrev} 
                                    className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white active:bg-white/20"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={handleNext} 
                                    className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white active:bg-white/20"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="text-[10px] font-mono text-yellow-500/50 uppercase tracking-tighter shrink-0">
                                {galleryIndex + 1} / {item.subItems.length}
                            </span>
                        </div>
                    )}
                </div>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {currentItem.description || item.description}
                </p>
            </div>
        </motion.div>
    );
};

export default function ContentSection() {
    const [ghContributions, setGhContributions] = useState(0);

    useEffect(() => {
        // Fetch GitHub Contributions
        fetch('https://github-contributions-api.jogruber.de/v4/HimanshuAlien?y=last')
            .then(res => res.json())
            .then(data => {
                if (data?.total?.lastYear) {
                    setGhContributions(data.total.lastYear);
                }
            })
            .catch(err => console.error("GitHub Fetch Error:", err));
    }, []);

    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [selectedAchievement, setSelectedAchievement] = useState<any | null>(null);

    const projects = [
        {
            title: "KrishiSaathi",
            description: "SIH 2025 Winner. A revolutionary agriculture tech platform.",
            fullDetails: "KrishiSaathi provides farmers with AI-driven insights for crop health, real-time market prices, and direct connection to buyers. Utilizing advanced computer vision for disease detection. Winner of Smart India Hackathon 2025.",
            image: "/projects/krishisaathi.png",
            tags: ["Twilio", "ML", "HTML"],
            link: "https://farmerhimu.vercel.app/"
        },
        {
            title: "College ERP",
            description: "Comprehensive management system for educational institutions.",
            fullDetails: "A full-stack ERP system handling attendance, grading, fee management, and library services. Built with a robust microservices architecture for scalability.",
            image: "/projects/college-erp-v2.png",
            tags: ["Hugging Face", "HTML", "CSS", "JS", "MongoDB", "Node.js"],
            link: "https://github.com/HimanshuAlien/college-management-system"
        },
        {
            title: "Suraksha AI",
            description: "Advanced safety monitoring system using computer vision.",
            fullDetails: "Suraksha AI leverages edge computing to process video feeds properly, detecting accidents, fire, and unauthorized access with 99% accuracy.",
            image: "/projects/suraksha-ai-v2.png",
            tags: ["PyTorch", "ML", "FastAPI"],
            link: "#"
        },
        {
            title: "Automated Website Builder",
            description: "AI-powered platform that builds websites from simple text prompts.",
            fullDetails: "A revolutionary tool that generates production-ready fully responsive websites in seconds Using advanced LLMs and component libraries. Features include real-time preview, code export, and custom theming.",
            image: "/projects/automated-website-builder-final.png",
            tags: ["n8n", "React", "Tailwind"],
            link: "#"
        },
        {
            title: "Gesture Based Racing",
            description: "Control Hill Climb Racing using hand gestures via webcam.",
            fullDetails: "An interactive game controller using computer vision. Players control the vehicle's throttle and brakes using hand gestures captured in real-time, built with Python and OpenCV for low-latency processing.",
            image: "/projects/gesture-game-v2.png",
            tags: ["Python", "OpenCV", "CVZone"],
            link: "#"
        },
        {
            title: "Campus Incident Reporter",
            description: "Secure platform for reporting campus safety incidents.",
            fullDetails: "A confidential reporting system enabling students to report incidents safely. Features real-time admin dashboards, anonymous reporting channels, and status tracking for efficient resolution.",
            image: "/projects/campus-reporter-v2.png",
            tags: ["HTML", "Node.js", "MongoDB"],
            link: "#"
        },
        {
            title: "FitTrack Pro",
            description: "Comprehensive gym management and fitness tracking solution.",
            fullDetails: "All-in-one fitness platform for users to track workouts, nutrition, and progress. Includes gym management features for class scheduling, member management, and subscription handling.",
            image: "/projects/fitness-tracker-v2.png",
            tags: ["Google Auth", "Fitbit", "HTML", "CSS", "JS", "MongoDB", "FastAPI"],
            link: "#"
        },
        {
            title: "Fixxora",
            description: "A dynamic service startup dedicated to tool and appliance repair.",
            fullDetails: "Fixxora is a dynamic service startup dedicated to repairing tools and household appliances. We connect users with skilled professionals for reliable, on-demand maintenance solutions. Currently in development, our goal is to provide a seamless and transparent service experience.",
            image: "/projects/coming-soon.jpeg",
            tags: ["Startup", "Service", "App"],
            link: "https://fixxora-app.vercel.app/"
        },
    ];

    const achievements = [
        {
            title: "ICDCIT 2026 Winner",
            description: "International Conference on Distributed Computing and Internet Technology.",
            fullDetails: "Awarded as a Winner in the ICDCIT Hackathon 2026. Recognized by top industry experts for building an innovative solution under pressure.",
            emoji: "🏆",
            image: "/achievements/icdcit-winner-v2.jpeg",
            link: "https://www.linkedin.com/posts/himanshu-mish21_icdcit-icdcithackathon2026-secondrunnersup-activity-7421523446880235520-Jgb3?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAGDrjBABgsFEIQ-u1snsnzy0xJCjO8No7UA"
        },
        {
            title: "MLSA Hackathon Winner",
            description: "Winner of the Microsoft Learn Student Ambassadors (MLSA) Hackathon.",
            fullDetails: "Secured first place in the MLSA Hackathon by developing an outstanding and innovative project. Commended for technical excellence and rapid prototyping.",
            emoji: "🏅",
            image: "/achievements/mlsa.jpeg",
            link: "https://www.linkedin.com/posts/himanshu-mish21_hackolympus-mlsa-hackathonwin-activity-7445857190411726848-xUTg?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAGDrjBABgsFEIQ-u1snsnzy0xJCjO8No7UA"
        },
        {
            title: "Hackathon Finalist",
            description: "Finalist in 6+ Major Hackathons globally.",
            fullDetails: "Consistently ranked among the top teams in prestigious global hackathons. Demonstrated rapid prototyping skills and effective problem-solving under pressure in high-stakes environments.",
            emoji: "🥈",
            image: "/achievements/hackathon-finalist-v2.jpeg",
            subItems: [
                { 
                    title: "Cyber Peace Finalist", 
                    description: "Global Cyber Peace Challenge Finalist - Ranked among top security research teams.",
                    image: "/achievements/Cyberpeace.jpg",
                    emoji: ""
                },
                { 
                    title: "India-Israel Hackathon", 
                    description: "Selected as Finalist in the prestigious Bilateral Innovation Challenge.",
                    image: "/achievements/Screenshot 2026-04-19 161346.png",
                    emoji: "🇮🇳" 
                },
                { 
                    title: "Meta Hackathon", 
                    description: "Finalist in the Meta PyTorch Hackathon for AI-driven safety solutions.",
                    image: "/achievements/meta.jpeg", 
                    emoji: "" 
                },
                { 
                    title: "Guidewire Trails Hackathon", 
                    description: "Recognized as a Finalist in the Guidewire Trails Hackathon.",
                    image: "/achievements/guidewire.jpeg", 
                    emoji: "" 
                },
                { 
                    title: "Deloitte Hackathon", 
                    description: "Recognized as a Finalist in Deloitte's National Innovation Challenge.",
                    image: "https://cdn.simpleicons.org/deloitte/white", 
                    emoji: "" 
                },
                { 
                    title: "SDIS Finalist", 
                    description: "Finalist in the Sustainable Development Innovation Summit Hackathon.",
                    image: "/achievements/hackathon-finalist-v2.jpeg", 
                    emoji: "" 
                },
            ],
            link: "#"
        },
        {
            title: "Vice President",
            description: "Khwaab Society at KIIT - Leading student welfare initiatives.",
            fullDetails: "Serving as Vice President of Khwaab Society, orchestrating large-scale events and social initiatives. Leading a team of 50+ members to drive positive change within the university and surrounding community.",
            emoji: "🎖️",
            image: "/achievements/khwaab-vp-v2.jpeg",
            link: "#"
        },
        {
            title: "SIH 2025 Winner",
            description: "Smart India Hackathon - First Prize in Agriculture Domain.",
            fullDetails: "Led the team to victory in the nation-wide Smart India Hackathon. Developed 'KrishiSaathi', a comprehensive solution for farmers, praised for its practical application and user-friendly interface.",
            emoji: "🥇",
            image: "/achievements/sih-winner-v2.jpeg",
            link: "https://www.linkedin.com/posts/himanshu-mish21_sih2025-smartindiahackathon-winner-activity-7405287430670540802-waXc?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAGDrjBABgsFEIQ-u1snsnzy0xJCjO8No7UA"
        },
    ];

    const experiences = [
        {
            role: "Tech Lead",
            company: "Fixxora",
            period: "Jan - March 2026",
            description: "Developed a comprehensive mobile application for a client focused on tool and appliance repair solutions.",
            current: true
        },
        {
            role: "Web Developer Intern",
            company: "Code Speedy Pvt Ltd",
            period: "June - August 2025",
            description: "Developed and maintained responsive web applications using React and Node.js. Optimized frontend performance by 40% and implemented secure authentication flows.",
            current: false
        }
    ];

    const tools = [
        { name: "HTML", Icon: TechIcons.HTML, color: "text-orange-500" },
        { name: "CSS", Icon: TechIcons.CSS, color: "text-blue-500" },
        { name: "JavaScript", Icon: TechIcons.JS, color: "text-yellow-400" },
        { name: "MongoDB", Icon: TechIcons.MongoDB, color: "text-green-500" },
        { name: "React", Icon: TechIcons.React, color: "text-cyan-400" },
        { name: "Next.js", Icon: TechIcons.NextJS, color: "text-white" },
        { name: "Python", Icon: TechIcons.Python, color: "text-blue-300" },
        { name: "PyTorch", Icon: TechIcons.PyTorch, color: "text-orange-600" },
        { name: "Node.js", Icon: TechIcons.NodeJS, color: "text-green-600" },
        { name: "Express", Icon: TechIcons.Express, color: "text-gray-200" },
        { name: "Git", Icon: TechIcons.Git, color: "text-red-500" },
        { name: "Git Bash", Icon: TechIcons.Bash, color: "text-gray-400" },
        { name: "n8n", Icon: TechIcons.n8n, color: "text-orange-400" },
    ];

    const marqueeText = "Agentic AI • Full Stack Developer • Automation Engineer • Gen AI Engineer • ";

    return (
        <div className="relative z-10 bg-[#050505] text-white overflow-hidden pb-12" >

            {/* Multi-Layered Cinematic Marquee Section */}
            <div className="w-full py-16 md:py-24 overflow-hidden mb-12 mt-12 relative z-20 flex flex-col gap-8" >
                
                {/* Layer 1: Straight Forward */}
                <div className="flex whitespace-nowrap relative border-y border-white/5 py-3 md:py-4 bg-white/[0.01]">
                    <motion.div
                        className="flex gap-12 md:gap-24 text-xs md:text-2xl font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] leading-none"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 50,
                        }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-white/20 whitespace-nowrap">
                                {marqueeText}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Layer 2: Slanted & Reverse */}
                <div className="flex whitespace-nowrap relative py-3 md:py-4 -rotate-2 md:-rotate-3 scale-110 bg-blue-500/[0.03] border-y border-blue-500/10 z-10">
                    <motion.div
                        className="flex gap-12 md:gap-24 text-xs md:text-2xl font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] leading-none"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 70,
                        }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-blue-400/40 whitespace-nowrap">
                                {marqueeText}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Layer 3: Straight Forward (Slightly Offset) */}
                <div className="flex whitespace-nowrap relative border-y border-white/5 py-3 md:py-4 bg-white/[0.01]">
                    <motion.div
                        className="flex gap-12 md:gap-24 text-xs md:text-2xl font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] leading-none"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 60,
                        }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-white/10 whitespace-nowrap">
                                {marqueeText}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div >

            <div className="max-w-[90rem] mx-auto px-4 md:px-6 flex flex-col gap-40">

                {/* Projects Section */}
                <section id="projects" className="scroll-mt-32">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-16 text-center tracking-tight"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Projects</span>
                    </motion.h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                onClick={() => setSelectedProject(project)}
                                className="group flex flex-col bg-[#080808] border border-white/10 hover:border-white/30 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 h-full"
                            >
                                {/* Padded Image Container for Modern Look */}
                                <div className="p-2 md:p-3 pb-0">
                                    <div className="h-32 md:h-48 relative overflow-hidden rounded-xl md:rounded-2xl bg-white/5">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                        
                                        <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <ArrowUpRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col flex-grow p-4 md:p-6 pt-4 md:pt-5">
                                    <h4 className="text-lg md:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                                        {project.title}
                                    </h4>
                                    <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] font-mono text-white/70 bg-white/5 border border-white/10 rounded-full group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-colors duration-300 uppercase tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Compact Modern Experience Section */}
                <section id="experience" className="scroll-mt-32 pb-24">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-12 text-center tracking-tight"
                    >
                        Experience<span className="text-white/20">.</span>
                    </motion.h3>

                    <div className="max-w-3xl mx-auto px-4 md:px-0">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
                            <div className="relative border-l border-white/10 ml-2 md:ml-4 space-y-10 md:space-y-14 py-2">
                                {/* Flowing Animated Beam */}
                                <motion.div
                                    className="absolute top-0 -left-[1px] w-[2px] h-[40%] bg-gradient-to-b from-transparent via-blue-500 to-transparent z-0"
                                    animate={{ top: ['-40%', '140%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />

                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="relative pl-6 md:pl-8 group"
                                    >
                                        {/* Compact Timeline Dot */}
                                        <div className="absolute left-0 top-1.5 w-3 h-3 -translate-x-[0.4rem] rounded-full bg-[#0a0a0a] border-2 border-white/20 group-hover:border-blue-500 transition-colors duration-500 z-10" />
                                        
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">{exp.role}</h4>
                                                <p className="text-white/60 font-medium">{exp.company}</p>
                                            </div>
                                            <span className="text-xs md:text-sm font-mono text-white/40 uppercase tracking-widest shrink-0 mt-1 md:mt-0">
                                                {exp.period}
                                            </span>
                                        </div>
                                        
                                        <p className="text-white/50 text-sm md:text-base leading-relaxed mt-3">
                                            {exp.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievements Section */}
                <section id="achievements" className="scroll-mt-32">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-16 text-center tracking-tight"
                    >
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Achievements</span>
                    </motion.h3>
                    <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
                        {achievements.map((item, index) => (
                            <AchievementCard key={index} item={item} index={index} isLast={index === achievements.length - 1} setSelectedAchievement={setSelectedAchievement} />
                        ))}
                    </div>
                </section>

                {/* Stats & Credentials Section */}
                {/* Stats & Credentials Section */}
                {/* Stats & Credentials Section */}
                <section id="stats" className="scroll-mt-32 pb-32">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-24 text-center tracking-tight"
                    >
                        Stats & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Credentials</span>
                    </motion.h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                        {/* Custom LeetCode Stats Component */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <LeetCodeStats />
                        </motion.div>

                        {/* GitHub Stats - Using Activity Graph for better reliability */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-2xl relative group overflow-hidden flex flex-col justify-between h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                    <h4 className="text-2xl font-bold text-white font-display mb-1">GitHub</h4>
                                    <p className="text-purple-400 text-xs font-mono uppercase tracking-widest">Open Source</p>
                                </div>
                                <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-purple-400 transition-colors" />
                            </div>

                            <div className="relative z-10 w-full overflow-hidden rounded-lg opacity-80 group-hover:opacity-100 transition-all pt-2">
                                {/* Reverted to Activity Graph as requested, using Emerald theme */}
                                <img
                                    src="https://github-readme-activity-graph.vercel.app/graph?username=HimanshuAlien&theme=react-dark&bg_color=0a0a0a&hide_border=true&area=true&color=10b981&custom_title=Activity%20Graph"
                                    alt="GitHub Stats"
                                    className="w-full object-cover"
                                />
                                <div className="flex justify-between items-center px-2 mt-2">
                                    <span className="text-[10px] uppercase font-mono text-white/30">
                                        Contributions
                                    </span>
                                    <span className="text-xs font-bold text-emerald-400">
                                        {ghContributions > 0 ? `${ghContributions} Last Year` : 'Active'}
                                    </span>
                                </div>
                            </div>
                            <a href="https://github.com/HimanshuAlien" target="_blank" className="absolute inset-0 z-20" aria-label="View GitHub Profile"></a>
                        </motion.div>
                    </div>

                    {/* Technical List Certifications */}
                    <div className="max-w-4xl mx-auto">
                        <motion.h4
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-sm font-mono text-white/40 uppercase tracking-widest mb-8 border-b border-white/10 pb-4"
                        >
                            Certifications
                        </motion.h4>

                        <div className="space-y-4">
                            {/* Certification 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group flex flex-col md:flex-row md:items-center justify-between p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg transition-colors cursor-default"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                        <div className="relative w-8 h-8">
                                            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" fill className="object-contain" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-display">Java Specialization</h3>
                                        <p className="text-white/40 text-sm mt-1">Data Structures & Algorithms</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                                        Udemy
                                    </span>
                                </div>
                            </motion.div>

                            {/* Certification 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="group flex flex-col md:flex-row md:items-center justify-between p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg transition-colors cursor-default"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity p-2 bg-white/5 rounded-full border border-white/10">
                                        <Cloud className="w-full h-full text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-display">System Design</h3>
                                        <p className="text-white/40 text-sm mt-1">Distributed Architectures</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                                        Coursera
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </section>

                {/* 3D Animated Tools & Skills */}
                <section id="tools" className="scroll-mt-32 pb-20">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-20 text-center tracking-tight"
                    >
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Tools</span>
                    </motion.h3>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 max-w-6xl mx-auto perspective-1000">
                        {tools.map((tool, i) => (
                            <ToolCard key={i} tool={tool} index={i} />
                        ))}
                    </div>
                </section>

            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <motion.div
                            layoutId={`project-${selectedProject.title}`}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            className="relative w-full max-w-5xl bg-[#0f0f0f] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-50 flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <div className="relative h-64 md:h-auto md:w-[45%] shrink-0 overflow-hidden">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" />
                            </div>
                            <div className="p-5 md:p-12 overflow-y-auto flex-1 flex flex-col relative bg-[#0f0f0f]">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors z-10 border border-white/5"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <h3 className="text-2xl md:text-5xl font-bold text-white mb-6 tracking-tight">{selectedProject.title}</h3>

                                <div className="flex flex-wrap gap-4 mb-8">
                                    {selectedProject.tags.map((tag: string) => (
                                        <span key={tag} className="text-sm font-mono text-blue-400 border border-blue-500/30 px-3 py-1 hover:bg-blue-500/10 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="prose prose-invert prose-lg max-w-none text-white/70 mb-10 leading-relaxed">
                                    <p>{selectedProject.fullDetails}</p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/10">
                                    {selectedProject.link === "#" ? (
                                        <button disabled className="inline-flex w-full md:w-auto justify-center items-center gap-3 px-8 py-4 bg-white/10 text-white/50 rounded-full font-bold text-lg cursor-not-allowed border border-white/5">
                                            Not Deployed
                                        </button>
                                    ) : (
                                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex w-full md:w-auto justify-center items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                                            View Live Project <ArrowUpRight className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Achievement Details Modal (Reusing/Duplicating logic for independent control) */}
            <AnimatePresence>
                {selectedAchievement && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAchievement(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <motion.div
                            layoutId={`achievement-${selectedAchievement.title}`}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-50 flex flex-col md:flex-row max-h-[80vh]"
                        >
                            <div className="relative h-48 md:h-auto md:w-[40%] shrink-0 overflow-hidden bg-white/5">
                                <Image
                                    src={selectedAchievement.image}
                                    alt={selectedAchievement.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" />
                            </div>
                            <div className="p-5 md:p-10 overflow-y-auto flex-1 flex flex-col relative bg-[#0f0f0f]">
                                <button
                                    onClick={() => setSelectedAchievement(null)}
                                    className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors z-10 border border-white/5"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">{selectedAchievement.title}</h3>

                                <div className="prose prose-invert prose-lg max-w-none text-white/70 mb-8 leading-relaxed">
                                    <p className="text-xl text-white mb-4">{selectedAchievement.description}</p>
                                    <p>{selectedAchievement.fullDetails}</p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/10">
                                    <a href={selectedAchievement.link} className="inline-flex w-full md:w-auto justify-center items-center gap-3 px-8 py-4 bg-yellow-500 text-black rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                                        View Award <ArrowUpRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
}
