import {io} from "socket.io-client"
import { Outlet } from "react-router-dom"
import { Chat_right } from "./Chat_right"


export const Chat_main = () => {


  return (
    <div className="w-full h-screen border border-2 flex overflow-hidden"> 
    <Chat_right />
    </div>
  )
}
