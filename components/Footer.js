"use client";
import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";


// Define the social links data
const socialLinks = [
    { icon: <BsTwitterX className="w-5 h-5" />, label: "X.com", href: "https://x.com/KhasruAru" },
    { icon: <FaGithub className="w-5 h-5" />, label: "Github", href: "https://github.com/ArushKhasr4u" },
    { icon: <FaDiscord className="w-5 h-5" />, label: "Discord", href: "https://discord.gg/WBD3Qr2K" },
];

export default function Footer() {



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

                   
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]"> Connect</h4>

                        <div className="flex flex-col gap-6">

                            <div className="flex flex-col gap-4">
                                {socialLinks.map((social, index) => (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="
          group
          flex items-center gap-3
          text-gray-500 hover:text-white
          transition-all duration-200
        "
                                    >

                                        {/* Icon */}
                                        <span className="
          text-gray-600
          group-hover:text-white
          transition-colors duration-200
        ">
                                            {social.icon}
                                        </span>

                                        {/* Label */}
                                        <span className="
          text-xs
          font-medium
          tracking-wide
          group-hover:translate-x-1
          transition-transform duration-200
        ">
                                            {social.label}
                                        </span>

                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-gray-600 text-[10px] md:text-xs text-center">
                        © 2026 BAKBAK Inc. Built with Next.js & Tailwind CSS.
                    </p>


                </div>
            </div>
        </footer>
    );
}