'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList
} from 'stream-chat-react';
import { ArrowLeft, ShieldCheck, PlusCircle } from 'lucide-react'; // Added PlusCircle
import 'stream-chat-react/dist/css/v2/index.css';

export default function ChatPage() {
  const { user } = useUser();
  const [otherUserId, setOtherUserId] = useState('');
  const [channel, setChannel] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: user?.publicMetadata?.token,
    userData: user?.id ? {
      id: user.id,
      name: user.firstName || user.username || "Guest",
      image: user.imageUrl || `https://getstream.io/random_png/?name=${user.firstName}`,
    } : null,
  });

  useEffect(() => {
    if (channel) setIsSidebarOpen(false);
  }, [channel]);

  const startChat = async (id = otherUserId) => {
    if (!client || !id.trim() || !user) return;
    const members = [user.id, id].sort();
    const channelId = `dm-${members.join('-')}`.substring(0, 64).replace(/[^a-zA-Z0-9_-]/g, '_');

    const chatChannel = client.channel('messaging', channelId, {
      members: members,
      isDirectMessage: true,
    });

    await chatChannel.watch();
    setChannel(chatChannel);
    setOtherUserId(''); // Clear input after starting
  };

  if (!user || !client) return <div className="h-screen bg-black" />;


  const filters = {
    type: 'messaging',
    members: { $in: [user.id] },
    isDirectMessage: true
  };
  const sort = { last_message_at: -1 };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden relative">

      {/* SIDEBAR */}
      <div className={`
        absolute md:relative z-20 w-full md:w-80 h-full border-r border-white/5 bg-[#080808] transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* FIX 2: Added the Missing "New Chat" Button */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
          <h2 className="text-xs font-black tracking-[0.2em] text-gray-400">INBOX TERMINAL</h2>
          <button
            onClick={() => {
              setChannel(null); // Return to landing page
              setIsSidebarOpen(false); // Close sidebar on mobile to show landing
            }}
            className="group flex items-center gap-2 text-blue-500 hover:text-white transition-all"
            title="Start New Chat"
          >
            <span className="text-[10px] font-bold uppercase hidden md:block">New</span>
            <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Chat client={client} theme="str-chat__theme-dark">
            <ChannelList
              filters={filters}
              sort={sort}
              Preview={(props) => {
                const members = Object.values(props.channel.state.members);
                const otherMember = members.find((m) => m.user.id !== user.id);
                const displayImage = otherMember?.user.image;
                const displayName = otherMember?.user.name || otherMember?.user.id || 'Unknown';

                return (
                  <div
                    onClick={() => {
                      props.setActiveChannel(props.channel);
                      setChannel(props.channel);
                    }}
                    className={`p-4 cursor-pointer border-b border-white/[0.02] transition-all hover:bg-white/[0.02] ${props.active ? 'bg-blue-500/10 border-r-2 border-r-blue-500' : ''
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {displayImage ? (
                          <img src={displayImage} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                            {displayName.charAt(0)}
                          </div>
                        )}
                        {otherMember?.user.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#080808] rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-gray-200">{displayName}</p>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </Chat>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 p-4 md:p-10 lg:p-20">
         <button onClick={() =>  setIsSidebarOpen(true)} className="items-center gap-2 block md:hidden text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={18} />
           
              </button>
        {!channel ? (
          /* Landing Page: Matching image_1d0a14.png */
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl opacity-10 pointer-events-none">
              <div className="w-full h-96 bg-blue-600/40 blur-[150px] rounded-full"></div>
            </div>

            <div className="relative z-10 text-center space-y-6">
             

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent italic">
                User Chat
              </h1>

              <p className="text-gray-400 max-w-lg mx-auto text-lg font-medium leading-relaxed">
                Enter a unique User ID to establish a private, encrypted connection.
              </p>

              <div className="w-full max-w-md mx-auto pt-8 space-y-4">
                <input
                  type="text"
                  value={otherUserId}
                  onChange={(e) => setOtherUserId(e.target.value)}
                  placeholder="Enter the user Id"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700 text-center font-mono"
                />
                <button
                  onClick={() => startChat()}
                  className="w-full py-5 bg-white text-black hover:bg-blue-500 hover:text-white rounded-2xl font-black transition-all uppercase tracking-[0.2em] text-sm italic"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <div className="flex flex-col h-full max-h-[850px] w-full max-w-5xl mx-auto border border-white/10 rounded-[2rem] overflow-hidden bg-[#080808] shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <div className="bg-[#0a0a0a] border-b border-white/5 p-4 flex items-center justify-between">
              <button onClick={() =>  setIsSidebarOpen(true)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Exit Terminal</span>
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/5 rounded-full border border-blue-500/20">
                <ShieldCheck size={14} className="text-blue-500" />
                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-tighter font-bold">Secure_Encryption_Active</span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <Chat client={client} theme="str-chat__theme-dark">
                <Channel channel={channel}>
                  <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                  </Window>
                  <Thread />
                </Channel>
              </Chat>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .str-chat {
          --str-chat__primary-color: #3b82f6;
          --str-chat__surface-canvas: transparent;
          --str-chat__surface-view: transparent;
          height: 100%;
        }
        .str-chat__channel-header {
            background: #080808 !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .str-chat__message-input {
            padding: 15px !important;
            background: #0a0a0a !important;
        }
        .str-chat__channel-list { width: 100% !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 10px; }
      `}</style>
    </div>
  );
}


