"use client"
import { useState } from 'react'; 
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Logs, X, Copy, Check } from 'lucide-react'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useUser();

  const copyUserId = async () => {
    if (!user?.id) return;
    await navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-black/100 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
          BAK<span className="text-blue-500">BAK</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 text-gray-300 font-medium items-center">

          <li>
            <Link href="/" className="hover:text-white hover:-translate-y-0.5 transition-all duration-200 block relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li>
            <Link href="/forums" className="hover:text-white hover:-translate-y-0.5 transition-all duration-200 block relative group">
              Forums
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li>
            <Link href="/chat" className="hover:text-white hover:-translate-y-0.5 transition-all duration-200 block relative group">
              UserChat
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          {/* Desktop User ID with Copy */}
          {user && (
            <li className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">

              <span className="text-xs text-gray-400 font-mono">
                ID: {user.id}
              </span>

              <button
                onClick={copyUserId}
                className="text-gray-400 hover:text-blue-500 transition"
                title="Copy User ID"
              >
                {copied ? (
                  <Check size={16} className="text-green-500"/>
                ) : (
                  <Copy size={16}/>
                )}
              </button>

            </li>
          )}

          <UserButton />

        </ul>

        {/* Mobile top right */}
        <div className="flex md:hidden items-center gap-4">

          <UserButton />

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Logs size={28} />}
          </button>

        </div>

      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden bg-black border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>

        <ul className="flex flex-col gap-4 p-6 text-gray-300 font-medium">

          <li>
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white">
              Home
            </Link>
          </li>

          <li>
            <Link href="/forums" onClick={() => setIsOpen(false)} className="hover:text-white">
              Forums
            </Link>
          </li>

          <li>
            <Link href="/chat" onClick={() => setIsOpen(false)} className="hover:text-white">
              UserChat
            </Link>
          </li>

          {/* Mobile User ID with Copy */}
          {user && (
            <li className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg border border-white/10">

              <span className="text-xs text-gray-400 font-mono">
                ID: {user.id.slice(0, 8)}...
              </span>

              <button
                onClick={copyUserId}
                className="text-gray-400 hover:text-blue-500 transition"
              >
                {copied ? (
                  <Check size={18} className="text-green-500"/>
                ) : (
                  <Copy size={18}/>
                )}
              </button>

            </li>
          )}

        </ul>

      </div>

    </nav>
  );
};

export default Navbar;