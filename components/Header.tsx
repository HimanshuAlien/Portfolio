import Link from "next/link";
import React from "react";

export default function Header() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "#projects" },
        { name: "Achievements", href: "#achievements" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 pointer-events-none">
            <nav className="bg-black/80 backdrop-blur-xl border border-white/5 rounded-full px-5 md:px-8 py-3 pointer-events-auto transition-all duration-300 hover:border-white/20 hover:bg-black/90 shadow-2xl shadow-black/50 max-w-[95vw] overflow-x-auto">
                <ul className="flex items-center gap-4 md:gap-8">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="relative text-[10px] md:text-xs font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest group whitespace-nowrap"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full opacity-50" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
