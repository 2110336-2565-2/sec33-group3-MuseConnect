import React ,{useState,useEffect,useContext} from 'react'
import {useRouter} from "../../../../server/routes/chat"
import Link from 'next/link'
const ChatEngine = dynamic(()=>
    import("react-chat-engine").then((module)=> module.ChatEngine)

);

const Message = dynamic(()=>
    import("react-chat-engine").then((module)=> module.MessageFormSocial)

);


export default function Chat() {
    const rounter = useRouter()
    // const {username,secret }  = 

    return (
        <div className='background'>
            <div className='shadow'>
                <ChatEngine
                    height = "calc(100vh - 200px"
                    projectID=""
                    // userName = {}
                />

            </div>

        </div>
    )
}