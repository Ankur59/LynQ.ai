import type { ChatMessage } from "../../types/chat.types";
import MarkdownBlock from "./MarkdownBlock";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  if (message.role === "user") {
    return (
      <div className="flex justify-center w-full">
        <div className="max-w-lg px-5 py-3 bg-[#1c1c1c] border border-white/6 rounded-2xl text-sm text-zinc-200 leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  // Assistant message
  return (
    <div className="flex gap-3 w-full max-w-2xl mx-auto">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-200 text-sm font-semibold shrink-0 mt-0.5">
        S
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 pt-1">
        <MarkdownBlock content={message.content} />
      </div>
    </div>
  );
};

export default MessageBubble;
