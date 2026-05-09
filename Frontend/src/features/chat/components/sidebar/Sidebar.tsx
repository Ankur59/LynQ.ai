import type { ChatSession } from "../../types/chat.types";
import SidebarHeader from "./SidebarHeader";
import ChatListItem from "./ChatListItem";

interface SidebarProps {
  sessions: ChatSession[];
  onSelectSession?: (id: string) => void;
  onNewChat?: () => void;
}

const Sidebar = ({ sessions, onSelectSession, onNewChat }: SidebarProps) => {
  return (
    <aside className="w-64 h-full flex flex-col bg-[#0e0e0e] border-l border-white/5 shrink-0">
      <SidebarHeader onNewChat={onNewChat} />

      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-0.5 pb-4">
        {sessions.map((session) => (
          <ChatListItem
            key={session.id}
            session={session}
            onClick={onSelectSession}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
