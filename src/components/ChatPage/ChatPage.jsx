import React, { useEffect, useState } from "react";
import { useChat } from "../ChatProvider/ChatProvider";
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/v2/css/index.css";
import "./ChatPage.css";
import CustomChannelPreview from "../CustomChannelPreview/CustomChannelPreview";
import UserList from "../UserList/UserList"; // ✅ Import UserList

const ChatPage = () => {
  const { chatClient, isChatConnected } = useChat();
  const [channel, setChannel] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  const currentUser = chatClient?.user; // ✅ Ensure the user is fetched

  useEffect(() => {
    if (!isChatConnected || !currentUser) return;

    const fetchChannel = async () => {
      try {
        const defaultChannel = chatClient.channel("messaging", "general", {
          name: "General Chat",
          members: [currentUser.id], // ✅ Ensure the user is a member
        });
    
        await defaultChannel.create(); // ✅ Ensure the channel exists
        await defaultChannel.watch();  // ✅ Start watching the channel
        setChannel(defaultChannel);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };
    

    fetchChannel();
  }, [isChatConnected, chatClient, currentUser]);

  // ✅ Function to start a direct message with another user
  const startChat = async (otherUserId) => {
    if (!chatClient || !currentUser) return;
  
    try {
      // 🔹 Generate a consistent, unique channel ID for every two-user chat
      const sortedUserIds = [currentUser.id, otherUserId].sort(); 
      const channelId = `dm_${sortedUserIds.join("_")}`; // Example: dm_abdullah_test1
  
      // 🔹 Check if the direct message (DM) channel already exists
      const existingChannels = await chatClient.queryChannels({
        type: "messaging",
        id: channelId, // ✅ Check using unique channel ID
      });
  
      if (existingChannels.length > 0) {
        setChannel(existingChannels[0]); // ✅ Use existing DM channel
      } else {
        // ✅ Create a new private chat between the two users
        const newChannel = chatClient.channel("messaging", channelId, {
          name: `Chat between ${currentUser.id} & ${otherUserId}`,
          members: sortedUserIds, // ✅ Only the two users as members
        });
  
        await newChannel.create();
        await newChannel.watch();
        setChannel(newChannel);
      }
    } catch (error) {
      console.error("Error creating or fetching channel:", error);
    }
  };

  const handleSetActiveChannel = (selectedChannel) => {
    setActiveChannel(selectedChannel);
    setChannel(selectedChannel); // ✅ Update main chat channel when a different chat is selected
  };
  

  if (!currentUser) return <p>Loading...</p>;
  if (!isChatConnected) return <p>Loading chat...</p>;

  return (
    <Chat client={chatClient} theme="messaging dark">
      <div className="chat-page">
        {/* Sidebar: User List & Channel List */}
        <div className="chat-sidebar">
          <h3 className="chat-heading">Users</h3>
          <UserList startChat={startChat} /> {/* ✅ Fixed User List */}

          <h3 className="chat-heading">Chats</h3>
          <ChannelList
            filters={{ type: "messaging", members: { $in: [currentUser.id] } }}
            sort={{ last_message_at: -1 }}
            options={{ state: true, watch: true, presence: true }}
            Preview={(props) => (
              <CustomChannelPreview
                {...props}
                currentUser={currentUser}
                setActiveChannel={handleSetActiveChannel}
                activeChannel={activeChannel}
              />
            )}
          />
        </div>

        {/* Chat Window */}
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
