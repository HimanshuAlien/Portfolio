import Link from "next/link";
import React from "react";

export default function Header() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Achievements", href: "#achievements" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto max-w-5xl pointer-events-none">
            <nav className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-full px-3 md:px-6 py-2.5 md:py-3 pointer-events-auto transition-all duration-500 hover:border-white/20 hover:bg-[#0a0a0a]/90 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-x-auto no-scrollbar mx-auto">
                <ul className="flex items-center justify-center gap-1 md:gap-2">
                    {links.map((link) => (
                        <li key={link.name} className={link.name === "Home" ? "hidden md:block" : ""}>
                            <Link
                                href={link.href}
                                className="relative px-2.5 py-1.5 md:px-4 md:py-2 text-[8px] md:text-[11px] font-bold text-white/50 hover:text-white transition-all duration-300 uppercase tracking-[0.1em] md:tracking-[0.2em] group whitespace-nowrap rounded-full"
                            >
                                {link.name}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-1/3 opacity-0 group-hover:opacity-100" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
