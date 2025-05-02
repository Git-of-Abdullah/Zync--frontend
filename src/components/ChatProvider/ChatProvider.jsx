import React, { createContext, useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

const ChatContext = createContext();
const chatClient = StreamChat.getInstance( import.meta.env.VITE_STREAM_API_KEY);

export const ChatProvider = ({ children, user }) => {
    const [isChatConnected, setIsChatConnected] = useState(false);

    const connectUserToChat = async () => {
        if (!user || !user._id) return;

        try {
            
            const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/getStreamToken`, {
                method: "GET",
                credentials: "include",
                headers: {
                    authorization: `bearer ${localStorage.getItem("token")}`,
                },
            });
            
            const data = await response.json();
            // console.log("Stream Token Response:", data);  
            if (data.status !== "success") throw new Error("Failed to get Stream Chat token");

            await chatClient.connectUser(
                { id: user._id, name: user.name, image: user.profilePic },
                data.token
            );

            setIsChatConnected(true);
            console.log("User connected to chat!");
        } catch (error) {
            console.error("Error connecting user to chat:", error);
        }
    };

    useEffect(() => {
        connectUserToChat();

        return () => {
            chatClient.disconnectUser();
        };
    }, [user]);

    return (
        <ChatContext.Provider value={{ chatClient, isChatConnected }}>
            <Chat client={chatClient}>{children}</Chat>
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);


