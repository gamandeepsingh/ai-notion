"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
    await auth.protect();
    const {userId, sessionClaims} = await auth();

    // Create a new document in the database
    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "new Document",
    });

    if (sessionClaims?.email) {
        await adminDb.collection("users").doc(sessionClaims.email).collection('rooms').doc(docRef.id).set({
            userId: sessionClaims.email,
            role:"owner",
            createdAt : new Date(),
            roomId : docRef.id
        })
    } else {
        throw new Error("Email is undefined");
    }
    return { docId: docRef.id };
}