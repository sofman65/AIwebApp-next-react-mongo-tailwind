import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "lib/mongodb";

export default async function handler(req, res) {
    try {
        const {user} = await getSession(req, res);
        const {message} = await req.body;
        const newUserMessage = {
            role: "user",
            content: message,
        };
        const client = await clientPromise;

        const db = client.db("MorfosiGpt");
        const chat = await db.collection("chats").insertOne({
            userId: user.sub,
            messages: [newUserMessage],
            title: message
        });
        res.status(200).json({_id: chat.insertedId.toString(),
        messages: [newUserMessage],
        title: message});
    } catch (error) {
        res.status(500).json({error: "Internal server error when CREATE NEW CHAT"});
        console.error("AN ERROR OCCURRED", error);
    }
}