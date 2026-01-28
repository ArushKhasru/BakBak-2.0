import Image from "next/image";
import { topics } from "@/assets/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Forums = () => {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-[#050505]">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <div className="px-4 py-1.5 mb-6 text-[10px] md:text-xs font-bold tracking-[0.2em] text-blue-400 uppercase bg-blue-500/5 border border-blue-500/20 rounded-full backdrop-blur-3xl">
            Community Hub
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent px-4">
            Discussion Forums
          </h1>
          <p className="mt-6 text-gray-500 max-w-2xl text-sm md:text-lg px-4 leading-relaxed">
            Join specialized rooms to discuss development, security, and the future of tech with experts worldwide.
          </p>
        </div>

        {/* Responsive Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {topics.map((topic) => (
            <div 
              key={topic.src} 
              className="relative group flex flex-col p-6 md:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm"
            >
              {/* Top Row: Icon & Responsive Action */}
              <div className="flex justify-between items-start mb-8">
                <div className="relative">
                  {/* Icon Glow */}
                  <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative p-1 rounded-full bg-gradient-to-tr from-white/10 to-transparent border border-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                    <Image 
                      src={topic.src} 
                      alt={topic.text} 
                      width={80} 
                      height={80} 
                      className="rounded-full w-16 h-16 md:w-20 md:h-20 object-cover"
                    />
                  </div>
                </div>

                <Link href={`/forum/${topic.slug || 'room'}`} className="z-20">
                 
                  <Button variant="outline" className="bg-white/5 cursor-pointer md:bg-transparent p-3 md:p-0 rounded-full border border-white/10 md:border-none opacity-100 md:opacity-0 md:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-blue-400 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                    <span className="">Join</span>
                    <span className="text-xl hidden md:inline">→</span>
                    </Button>
                </Link>
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {topic.text}
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-light">
                  {topic.desc}
                </p>
              </div>

              {/* Footer Stats */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold">
                <div className="flex flex-col">
                  <span className="text-gray-400">2.4k Members</span>
                </div>
                <div className="flex items-center gap-2 bg-green-500/5 px-2 py-1 rounded-md border border-green-500/10 italic">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-500/80">142 Online</span>
                </div>
              </div>
            </div> 
          ))}
        </div>
      </div>
    </section>
  );
};

export default Forums;