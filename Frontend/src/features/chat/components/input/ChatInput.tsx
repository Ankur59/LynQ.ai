import { useState } from "react";

interface ChatInputProps {
  onSend?: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasContent = value.trim().length > 0;

  return (
    <div className="px-6 pb-6 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 bg-[#161616] border border-white/8 rounded-2xl px-4 py-3 focus-within:border-white/20 transition-colors duration-200">
          {/* Attach button */}
          <button
            title="Attach file"
            className="text-zinc-500 hover:text-zinc-300 transition-colors duration-150 shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          {/* Text input */}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none border-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!hasContent || disabled}
            title="Send message"
            className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200
              ${hasContent && !disabled
                ? "bg-teal-500 text-white hover:bg-teal-400"
                : "text-zinc-600 cursor-not-allowed"
              }`}
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
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
