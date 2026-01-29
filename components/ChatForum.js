"use client"
import { useState, useEffect } from 'react';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

// Environment variables
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const userId = process.env.NEXT_PUBLIC_STREAM_USER_ID;
const userName = process.env.NEXT_PUBLIC_STREAM_USERNAME;
const userToken = process.env.NEXT_PUBLIC_STREAM_USER_TOKEN;

const user = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

/**
 * 1. Define the function at the top of the file so it's accessible.
 * Added .trim() to handle trailing spaces like in "react-discussion ".
 */
function toTitleCase(str) {
  if (!str) return "";
  return str
    .trim()
    .replace(/-/g, " ")
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

export default function ChatForum({ slug }) {
  const [channel, setChannel] = useState();

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    // 2. SAFETY CHECK: If slug or client is missing, do not proceed.
    // This prevents the "member based IDs" error from your screenshot.
    if (!client || !slug) return;

    // 3. Apply your formatting for the display name
    const formattedName = toTitleCase(slug);

    // Create the channel using the slug as the unique ID
    const newChannel = client.channel('messaging', slug, {
      image: `https://getstream.io/random_png/?name=${slug}`,
      name: formattedName+"- Discussion", 
    });

    setChannel(newChannel);
  }, [client, slug]);

  if (!client) return <div>Connecting to Chat...</div>;
  if (!channel) return <div>Loading {toTitleCase(slug)}...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}