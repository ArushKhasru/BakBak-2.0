"use client"
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

const Navbar = () => {
  // const user = useUser();
  // console.log(user.user?.id)
  return (
    <nav className="sticky top-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className=" max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand/Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
          BAK<span className="text-blue-500">BAK</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-10 text-gray-300 font-medium">
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

      </div>
    </nav>
  );
};

export default Navbar;

export const metadata = {
  title: 'Home - BakBak',
  description: 'Welcome to BakBak, your secure and reliable chat application.',
}
 