interface SidebarHeaderProps {
  onNewChat?: () => void;
}

const SidebarHeader = ({ onNewChat }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-3 py-4">
      <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
        Recent Chats
      </span>

      <button
        onClick={onNewChat}
        title="New chat"
        className="w-6 h-6 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-white/10 transition-all duration-150"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
};

export default SidebarHeader;
