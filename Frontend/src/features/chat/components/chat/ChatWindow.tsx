import type { ChatMessage } from "../../types/chat.types";

import MessageList from "./MessageList";
import ChatInput from "../input/ChatInput";

interface ChatWindowProps {
  messages: ChatMessage[];
  onSend?: (message: string) => void;
}

const ChatWindow = ({ messages, onSend }: ChatWindowProps) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* <TopBar /> */}
      <MessageList messages={messages} />
      <ChatInput onSend={onSend} />
    </div>
  );
};

export default ChatWindow;
