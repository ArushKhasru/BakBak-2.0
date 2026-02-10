import ChatForum from "@/components/ChatForum"
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function Page({ params }) {
  const user = await currentUser();
  const { slug } = await params;

  let token = user.publicMetadata?.token;
  const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const api_secret = process.env.NEXT_PUBLIC_STREAM_API_SECRET;
  const serverClient = StreamChat.getInstance(api_key, api_secret);

  if (!token) {
    token = serverClient.createToken(user.id);
   
    const client = await clerkClient();
    await client.users.updateUser(user.id, {
      publicMetadata: { token: token },
    });
  }

  // Upsert user in Stream
  await serverClient.upsertUser({ id: user.id, name: user.firstName });

  // Ensure the channel exists and user is a member
  let channel = serverClient.channel('messaging', slug);
  try {
    await channel.query(); // Check if channel exists
    await channel.addMembers([user.id]); // Add user if not already a member
  } catch (error) {
    // Channel doesn't exist, create it
    channel = serverClient.channel('messaging', slug, {
      image: 'https://getstream.io/random_png/?name=react',
      name: capitalize(slug) + "Channel",
      members: [user.id],
      created_by_id: user.id,
    });
    await channel.create();
  }

  return <ChatForum slug={slug} clerkUser = {{id: user.id, name:user.firstname, token: token }}/>
}
export const metadata = {
  title:  'ChatForum - BakBak',
  description: 'Welcome to BakBak, your secure and reliable chat application.',
}
