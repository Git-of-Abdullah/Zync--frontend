import React, { useEffect, useState } from "react";
import { useChat } from "../ChatProvider/ChatProvider";
import { Chat, Channel, ChannelList, MessageList, MessageInput, Window } from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/v2/css/index.css"; // ✅ Ensure CSS is imported
import "./ChatPage.css"

const ChatPage = () => {
  const { chatClient, isChatConnected } = useChat();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!isChatConnected) return;

    // ✅ Auto-select a default channel (optional)
    const defaultChannel = chatClient.channel("messaging", "general", {
      name: "General Chat",
    });

    setChannel(defaultChannel);
  }, [isChatConnected, chatClient]);

  if (!isChatConnected) return <p>Loading chat...</p>;

  return (
    <Chat client={chatClient} theme="messaging light">
      <div className="chat-page">
        {/* Sidebar - Shows the list of DMs and group chats */}
        <div className="chat-sidebar">
          <ChannelList
            filters={{ type: "messaging" }} // Fetch only messaging-type chats
            sort={{ last_message_at: -1 }} // Sort by latest message
            onSelect={(selectedChannel) => setChannel(selectedChannel)} // Click to open chat
          />
        </div>

        {/* Main chat window */}
        <div className="chat-main">
          {channel ? (
            <Channel channel={channel}>
              <Window>
                <MessageList />
                <MessageInput />
              </Window>
            </Channel>
          ) : (
            <p>Select a chat to start messaging</p>
          )}
        </div>
      </div>
    </Chat>
  );
};

export default ChatPage;
