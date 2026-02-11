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

import { ArrowLeft, ShieldCheck, PlusCircle } from 'lucide-react';
import 'stream-chat-react/dist/css/v2/index.css';

function ChatApp({ user, apiKey }) {
  const [otherUserId, setOtherUserId] = useState('');
  const [channel, setChannel] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize the Stream Client
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: user.publicMetadata.token,
    userData: {
      id: user.id,
      name: user.firstName || user.username || "Guest",
      image: user.imageUrl || `https://getstream.io/random_png/?name=${user.firstName}`,
    },
  });

  useEffect(() => {
    if (channel) setIsSidebarOpen(false);
  }, [channel]);

  // GUARD: If the client isn't ready, don't render the Stream components.
  // This prevents the "Cannot read properties of null (reading 'user')" error.
  if (!client) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">Connecting_To_UserChat...</p>
      </div>
    );
  }

  const startChat = async (id = otherUserId) => {
    if (!client || !user || !id.trim()) return;

    const members = [user.id, id].sort();
    // const channelId = `dm-${members.join('-')}`.substring(0, 64).replace(/[^a-zA-Z0-9_-]/g, '_');

    const chatChannel = client.channel('messaging', otherUserId, {
      members,
      isDirectMessage: true,
    });

    await chatChannel.watch();
    setChannel(chatChannel);
    setOtherUserId('');
  };

  const filters = {
    type: 'messaging',
    members: { $in: [user.id] },
    isDirectMessage: true,
    member_count: 2,
  };

  const sort = { last_message_at: -1 };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden relative">
      
      {/* INBOX SIDEBAR */}
      <div className={`
          absolute md:relative z-20 w-full md:w-80 h-full border-r border-white/5 bg-[#080808] transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
          <h2 className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">Inbox</h2>
          <button
            onClick={() => {
              setChannel(null);
              setIsSidebarOpen(false);
            }}
            className="group flex items-center gap-2 text-blue-500 hover:text-white transition-all bg-blue-500/5 p-2 rounded-lg border border-blue-500/20"
          >
            <span className="text-[10px] font-bold uppercase hidden md:block">New Chat</span>
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform"/>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* We wrap ChannelList in Chat provider */}
          <Chat client={client} theme="str-chat__theme-dark">
            <ChannelList
              filters={filters}
              sort={sort}
              Preview={(props) => {
                // Defensive check: Ensure channel and state exist before accessing members
                const members = props.channel?.state?.members ? Object.values(props.channel.state.members) : [];
                const otherMember = members.find((m) => m.user?.id && m.user.id !== user.id);
                
                if (!otherMember?.user) return null;

                return (
                  <div
                    onClick={() => {
                      props.setActiveChannel(props.channel);
                      setChannel(props.channel);
                    }}
                    className={`p-4 cursor-pointer border-b border-white/[0.02] transition-all hover:bg-white/[0.03] ${
                      props.active ? 'bg-blue-500/10 border-r-2 border-r-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={otherMember.user.image || `https://getstream.io/random_png/?name=${otherMember.user.name || otherMember.user.id}`}
                        className="w-10 h-10 rounded-full border border-white/10"
                        alt=""
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-gray-200">
                            {otherMember.user.name || otherMember.user.id}
                        </p>
                        <p className="text-[10px] text-gray-600 font-mono uppercase">Direct Chat</p>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </Chat>
        </div>
      </div>

      {/* CHAT INTERFACE */}
      <div className="flex-1 flex flex-col h-full relative z-10 p-4 md:p-10 lg:p-20">
         <button onClick={() => setIsSidebarOpen(true)} className=" block md:hidden text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={18}/>
              </button>
        {!channel ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <h1 className="text-6xl md:text-8xl font-black italic text-transparent bg-gradient-to-b from-white to-white/20 bg-clip-text">
              User Chat
            </h1>
            <p className="text-gray-500 max-w-sm font-medium">Enter the user ID you wanna chat with.</p>
            <div className="w-full max-w-md space-y-3">
              <input
                value={otherUserId}
                onChange={(e) => setOtherUserId(e.target.value)}
                placeholder="Enter User ID..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-center text-xl focus:border-blue-500/50 outline-none transition-all"
              />
              <button
                onClick={() => startChat()}
                className="w-[50%] py-5 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest text-xs italic"
              >
                Connect
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full border border-white/10 rounded-[2rem] overflow-hidden bg-[#080808] shadow-2xl">
            <div className="flex justify-between items-center p-5 border-b border-white/5 bg-[#0a0a0a]">
              <button onClick={() => setChannel(null)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                <ArrowLeft size={18}/>
                <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
              </button>
              <div className="flex items-center gap-2 text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                <ShieldCheck size={14}/>
                <span className="text-[9px] font-black uppercase tracking-tighter">Encrypted</span>
              </div>
            </div>

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
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { user, isLoaded } = useUser();
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  if (!isLoaded || !user?.publicMetadata?.token) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">Connecting...</p>
      </div>
    );
  }

  return <ChatApp user={user} apiKey={apiKey} />;
}