
import { StreamChat } from "stream-chat";
import { auth, clerkClient } from '@clerk/nextjs/server'


const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const api_secret = process.env.NEXT_PUBLIC_STREAM_API_SECRET;
// const user_id = "user_38sjq3AhOJA0PVR9aQmVsNU1m3N";

export async function POST(request) {
  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  // Create User Token
  // console.log(token)
  const user = await request.json();

  const token = serverClient.createToken(user.data.id);
  console.log("A NEW USER HAS BEEN CREATED", token);
  const client = await clerkClient();
  await serverClient.upsertUser({id: user.data.id})

  await client.users.updateUser(user.data.id, {
    publicMetadata: { token: token },
  });

  //Give acess to this user to all channel
  const slugs = ["python-new", "cryptography-new", "ui-design-new", "react-nextjs-new", "cybersecurity-new"];
  await Promise.all(slugs.map(async (item) => {
     const channel = serverClient.channel('messaging', item, {
      image: 'https://getstream.io/random_png/?name=react',
      name: capitalize(item) + "Channel",
      created_by_id:user.data.id,
    });
    await channel.create();
    await channel.addMembers([user.data.id]);
  }))

  return Response.json({ projectName: 'Next.js' })
}
