
import Link from 'next/link';
import { Button } from '@/components/ui/button';



export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-20 px-6 flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg text-sm font-medium text-blue-400">
          ✨ Now with end-to-end encryption
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
          Connect. Chat.<br />Stay Private.
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
          The ultra-minimalist messaging platform designed for speed and security.
          No tracking. No ads. Just pure conversation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href={"/forums"}>
          <Button className="px-8 py-4 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-105">
            Start Chatting Free
          </Button>
          </Link>
          <Button className="px-8 py-4 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all backdrop-blur-md">
            View Features
          </Button>
        </div>

        {/* Dashboard Mockup Placeholder */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-2 shadow-2xl">
          <div className="rounded-xl bg-black/80 aspect-video flex items-center justify-center text-gray-600 border border-white/5 italic">
            [ Interactive Chat Interface Preview ]
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Privacy first. Always.</h2>
          <p className="text-gray-500">Built on modern protocols for the next generation of web users.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "E2E Encryption", desc: "Messages are encrypted locally. Even we can't read them.", icon: "🔒" },
            { title: "Quantum Ready", desc: "Future-proof security that stays ahead of the curve.", icon: "🧬" },
            { title: "Open Source", desc: "Transparent code audited by global security experts.", icon: "📂" }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-gray-500">Choose the plan that fits your conversation style.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col">
              <h3 className="text-xl font-medium text-gray-400">Basic</h3>
              <div className="text-5xl font-bold my-6">$0</div>
              <ul className="space-y-4 mb-10 text-gray-300 flex-grow">
                <li>• Unlimited personal chats</li>
                <li>• 5GB Cloud storage</li>
                <li>• Standard encryption</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all font-semibold">
                Start for Free
              </button>
            </div>

            {/* Pro Tier */}
            <div className="p-10 rounded-3xl border border-blue-500/50 bg-blue-600/10 backdrop-blur-xl relative flex flex-col">
              <div className="absolute top-4 right-4 bg-blue-500 text-[10px] font-black px-2 py-1 rounded text-white uppercase tracking-widest">Recommended</div>
              <h3 className="text-xl font-medium text-blue-400">Power User</h3>
              <div className="text-5xl font-bold my-6">$5<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-10 text-gray-200 flex-grow">
                <li>• Everything in Basic</li>
                <li>• 100GB Cloud storage</li>
                <li>• Custom themes & emojis</li>
                <li>• Priority delivery nodes</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-lg shadow-blue-600/40">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
export const metadata = {
  title: 'Home - BakBak',
  description: 'Welcome to BakBak, your secure and reliable chat application.',
}