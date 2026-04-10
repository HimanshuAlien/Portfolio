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
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-full px-4 md:px-8 py-2 md:py-3 pointer-events-auto transition-all duration-500 hover:border-white/20 hover:bg-[#0a0a0a]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-full md:max-w-max overflow-x-auto no-scrollbar">
                <ul className="flex items-center justify-center gap-1 md:gap-4">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="relative px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-[11px] font-bold text-white/50 hover:text-white transition-all duration-300 uppercase tracking-[0.15em] md:tracking-[0.2em] group whitespace-nowrap rounded-full hover:bg-white/5"
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
