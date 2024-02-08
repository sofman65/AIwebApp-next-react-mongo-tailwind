import { ChatSideBar } from "components/ChatSideBar";
import Head from "next/head";
import { streamReader } from "openai-edge-stream";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "components/Message";

export default function ChatPage() {
 
  const [incomingMessages, setIncomingMessages] = useState("");
  const [messageText, setMessageText] = useState("");
  const [newChatMessages, setNewChatMessages] = useState([]);
  const [generatingResponse, setGeneratingResponse] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setGeneratingResponse(true);
    setNewChatMessages(prev => {
      const newChatMessages = [...prev, {
        _id: uuid(),
        role: "user",
        content: messageText,
      },
     ];
      return newChatMessages;
    });
    setMessageText("");

    const response = await fetch("/api/chat/createNewChat", {
     method: "POST",
     headers: {
      "content-type": "application/json",
     },
    body: JSON.stringify({message: messageText,
    }),
    }); 

    const json = await response.json();
    console.log("Create New Chat: ", json);
    // const response = await fetch("/api/chat/sendMessage", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({message: messageText}),
    // });
    // const data = await response.body;
    // if(!data){
    //   return;
    // }
    // const reader = data.getReader();
    // await streamReader(reader, (message) => {
    //   console.log("Message Text: ", message);
    //   setIncomingMessages(s => `${s}${message.content}`)
    // });

    setGeneratingResponse(false);
  }
  return (
    <>
      <Head>
        <title>New chat</title>
      </Head>
      <div className=" grid h-screen grid-cols-[260px_1fr]">
    
        <ChatSideBar></ChatSideBar>
        
        <div className="flex flex-col overflow-hidden bg-gray-700 ">
          <div className="flex-1 text-white overflow-scroll">
            {newChatMessages.map((message) => (
            <Message
            key = {message._id}
            role = {message.role}
            content = {message.content}
            />
            ))}
            {!!incomingMessages && (<Message
            role = "assistant"
            content = {incomingMessages}>
            </Message>
            )} 

          </div> 
        
  
          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2" disabled = {generatingResponse}>
              <textarea 
              value= {messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder= {generatingResponse ? "Generating response..." : "Type a message"}
              className="w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-red-500 focus:bg-gray-600 focus:outline focus: outline-red-500 "/>
              <button className= "btn" type="submit">
                Send
              </button>
              </fieldset>
            </form>
          </footer>
        </div>
        </div>
        
      

      
      

      
      

    </>
    
  
  );

}


  
