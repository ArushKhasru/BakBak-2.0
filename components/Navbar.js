"use client"
import { useState } from 'react'; // Added for toggle logic
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Logs, X } from 'lucide-react'; // Added Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  return (
    <nav className="sticky top-0 w-full z-50 bg-black/100 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand/Logo */}
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
          <UserButton />
        </ul>

        {/* Mobile Menu Button & UserButton */}
        <div className="flex md:hidden items-center gap-4">
          <UserButton />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Logs size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Dropdown */}
      <div className={`md:hidden bg-black border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
        <ul className="flex flex-col gap-4 p-6 text-gray-300 font-medium">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white">Home</Link>
          </li>
          <li>
            <Link href="/forums" onClick={() => setIsOpen(false)} className="hover:text-white">Forums</Link>
          </li>
          <li>
            <Link href="/chat" onClick={() => setIsOpen(false)} className="hover:text-white">UserChat</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;