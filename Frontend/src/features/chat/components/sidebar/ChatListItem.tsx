import type { ChatSession } from "../../types/chat.types";

interface ChatListItemProps {
  session: ChatSession;
  onClick?: (id: string) => void;
}

const ChatListItem = ({ session, onClick }: ChatListItemProps) => {
  return (
    <button
      onClick={() => onClick?.(session.id)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group
        ${session.active
          ? "bg-white/10 text-white"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
        }`}
    >
      {/* Chat bubble icon */}
      <svg
        className={`w-4 h-4 shrink-0 transition-colors duration-150
          ${session.active ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-400"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>

      <span className="text-sm font-medium truncate leading-tight">
        {session.title}
      </span>
    </button>
  );
};

export default ChatListItem;
