import { env } from "next.config";
import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
    runtime: "edge",
};

export default async function handler(req) {
try{
    const {message} = await req.json();
    const initialChatMessage = {
        role: "system",
        content: "Your name is Μόρφωση.You are a Python Tutor,that speaks ONLY GREEK dedicated to helping users learn Python and build end-to-end projects using Python and its related libraries. Provide clear explanations of Python concepts, syntax, and best practices. Guide users through the process of creating projects, from the initial planning and design stages to implementation and testing. Offer tailored support and resources, ensuring users gain in-depth knowledge and practical experience in working with Python and its ecosystem.",
    }
    const stream = await OpenAIEdgeStream('https://api.openai.com/v1/chat/completions', {
        headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [initialChatMessage, { content: message, role: "user"}],
            stream: true,
        }),
    });
    return new Response(stream);
}


catch (error) {
    console.error("AN ERROR OCCURRED", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

}
