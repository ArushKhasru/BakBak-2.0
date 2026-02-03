"use client";
import { useState } from "react";
import Link from "next/link";
import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";


export default function Footer() {
    const [email, setEmail] = useState("");

    return (
        <footer className="relative border-t border-white/5 bg-[#050505] pt-16 pb-8 px-6 overflow-hidden">
            {/* Subtle Background Glow Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main Grid: 1 col on mobile, 4 on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
                        <Link href="/" className="text-2xl font-black tracking-tighter text-white mb-6 block">
                            BAK<span className="text-blue-500">BAK</span>
                        </Link>
                        <p className="text-gray-500 max-w-sm leading-relaxed mb-8 text-sm md:text-base">
                            The future of private messaging. Secure, open-source, and built for the next generation of the web.
                        </p>
                        
                        {/* Newsletter Input - Responsive Width */}
                        <div className="flex w-full max-w-sm group/input">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Updates via email"
                                className="w-full bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                            <button
                                className={`px-6 py-2 rounded-r-xl text-sm font-bold transition-all duration-500 border-y border-r whitespace-nowrap
                                    ${email.length > 0 
                                        ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                                        : "bg-white/5 border-white/10 text-gray-500"
                                    }`}
                            >
                                Join
                            </button>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Platform</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Download</Link></li>
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Features</Link></li>
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Resources</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Open Source</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar: Stacked on mobile, row on md+ */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-gray-600 text-[10px] md:text-xs text-center">
                        © 2026 BAKBAK Inc. Built with Next.js & Tailwind CSS.
                    </p>
                    <div className="flex gap-8 ">
                        {[<FaTwitter className="w-5 h-5" />, <FaGithub className="w-5 h-5" />, <FaDiscord className="w-5 h-5" />].map((social) => (
                            <Link
                                key={social}
                                href="#"
                                className="text-gray-500 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors"
                            >
                                {social}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}