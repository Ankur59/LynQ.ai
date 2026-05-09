import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat.types";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageList;
