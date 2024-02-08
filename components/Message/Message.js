import { useUser } from "@auth0/nextjs-auth0/client";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export const Message = ({ role, content }) => {

    const { user } = useUser();
    console.log(user)
    return (
        <div className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${role === "assistant" ? "bg-gray-600" : "bg-gradient-to-br"}`}>

            <div>
                {role === "user" && !!user &&(
                    <Image
                        src={user.picture}
                        width={30}
                        height={30}
                        alt="User Avatar"
                        className="rounded-sm shadow-md shadow-black/50">
                    </Image>
                )}
            
            
            {role === "assistant" && (
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-sm shadow-md shadow-black/50 bg-gray-800">
                <FontAwesomeIcon icon = {faRobot} className="text-red-200"/>
            </div>
            )}

        </div>
        <div className="prose prose-invert">
            <div><ReactMarkdown>{content}</ReactMarkdown></div>
        </div>
        </div>
        
    )
}

