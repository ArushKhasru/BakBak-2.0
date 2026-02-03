
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
  await client.users.updateUser(user.data.id, {
    publicMetadata: { token: token },
  });
  return Response.json({ projectName: 'Next.js' })
}
