export default function ChatBubble({ message, isSender }) {
  return (
    <div
      className={`max-w-xs px-4 py-2 rounded-lg text-white 
        ${isSender ? "bg-blue-600 self-end" : "bg-gray-600 !text-black-900 self-start"}`}
      style={{ wordBreak: "break-word" }}
    >
      {message}
    </div>
  );
}
