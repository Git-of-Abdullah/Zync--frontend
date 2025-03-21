import "./CustomChnnelPreview.css";
import defaultPic from "../../assets/images/default profile.png";

const CustomChannelPreview = ({ channel, setActiveChannel, currentUser, activeChannel }) => {
  // Get the other user in a one-on-one chat
  const otherUser = Object.values(channel.state.members).find(
    (member) => member.user.id !== currentUser.id
  )?.user;

  // Get the last message (if available)
  const lastMessage = channel.state.messages.length
    ? channel.state.messages[channel.state.messages.length - 1].text
    : "No messages yet";

  // Get unread count
  const unreadCount = channel.countUnread();

  // Check if this channel is the active one
  const isActive = channel.id === activeChannel?.id;

  return (
    <div
      onClick={() => setActiveChannel(channel)}
      className={`channel-preview ${isActive ? "active-channel" : ""} ${unreadCount > 0 ? "unread" : ""}`}
    >
      <img
        src={otherUser?.image || defaultPic}
        alt="User Profile"
        className="channel-avatar"
      />
      <div className="channel-info">
        <p className="channel-name">{otherUser?.name || "You"}</p>
        <p className="last-message">{lastMessage}</p>
      </div>
      {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
    </div>
  );
};

export default CustomChannelPreview;
