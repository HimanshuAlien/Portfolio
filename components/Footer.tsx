"use client";

import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#020202] text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Contact Heading */}
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Let&apos;s work together.
                        </h2>
                        <p className="text-xl text-white/50 max-w-lg mb-8">
                            Open for opportunities. If you have a project in mind, let&apos;s make it happen.
                        </p>
                        <a
                            href="mailto:himanshu.mishra.connect@gmail.com"
                            className="group inline-flex items-center gap-2 text-xl md:text-3xl font-medium relative overflow-hidden"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">himanshu.mishra.connect@gmail.com</span>
                            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-0"></span>
                        </a>
                    </div>

                    {/* Social Links & Info */}
                    <div className="md:text-right flex flex-col md:items-end gap-8">
                        <div className="flex gap-6">
                            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/20 transition-colors">
                                <Github size={24} />
                            </a>
                            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/20 transition-colors">
                                <Linkedin size={24} />
                            </a>
                            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/20 transition-colors">
                                <Twitter size={24} />
                            </a>
                        </div>
                        <div className="text-sm text-white/30">
                            <p>&copy; {new Date().getFullYear()} Himanshu. All rights reserved.</p>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
