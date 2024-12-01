import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId ,sessionClaims } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const {room} = await req.json();

  const session = liveblocks.prepareSession(sessionClaims?.email,{
    userInfo:{
        email:sessionClaims?.email,
        name:sessionClaims?.fullName,
        avatar:sessionClaims?.image
    }
  })

  const usersInRoom = await adminDb
    .collection("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if(userInRoom?.exists){
    session.allow("room",session.FULL_ACCESS);
    const {body, status} = await session.authorize();

    return new Response(body,{ status });
  }
  // Your protected logic here
  return NextResponse.json({message:"You are not in this room"},{ status: 403 });
}
