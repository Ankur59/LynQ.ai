import { useState } from "react";
import type { ChatMessage, ChatSession } from "../../types/chat.types";
import Sidebar from "../sidebar/Sidebar";
import ChatWindow from "../chat/ChatWindow";

// ── Mock data — replace with real socket/API data during integration ──
const MOCK_SESSIONS: ChatSession[] = [
  { id: "1", title: "Q3 Marketing Report Data", active: true },
  { id: "2", title: "Component Architecture Review" },
  { id: "3", title: "System Integration Notes" },
  { id: "4", title: "Brainstorming Session" },
];

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: `Hello! I'm your AI assistant. I notice we're working within the new "Projects" workspace you selected from the top navigation. How can I help you synthesize the data for the Q3 report?`,
  },
  {
    id: "2",
    role: "user",
    content: `Can you pull the specific engagement metrics from the last marketing campaign and format them into a markdown table? Keep it concise.`,
  },
  {
    id: "3",
    role: "assistant",
    content: `Certainly. Here are the core engagement metrics from the "Summer Launch" campaign based on the project files:

| Channel | Impressions | CTR | Conv. Rate |
|---------|-------------|-----|------------|
| Email | 125,000 | 4.2% | 1.8% |
| Social | 450,000 | 1.5% | 0.4% |
| Paid Search | 85,000 | 6.8% | 3.2% |`,
  },
];
// ─────────────────────────────────────────────────────────────────────

const ChatLayout = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>(MOCK_SESSIONS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);

  const handleSelectSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => ({ ...s, active: s.id === id }))
    );
    setActiveSessionId(id);
    // TODO: load messages for selected session from socket/API
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: "New Chat",
      active: true,
    };
    setSessions((prev) =>
      [newSession, ...prev.map((s) => ({ ...s, active: false }))]
    );
    setActiveSessionId(newId);
    setMessages([]);
  };

  const handleSend = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    // TODO: emit to socket and push assistant response when received
  };

  return (
    <div className="flex h-screen w-screen bg-[#0a0a0a] overflow-hidden">
      {/* Sidebar — right side, matching screenshot */}
      <Sidebar
        sessions={sessions}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
      />
      {/* Main chat area */}
      <ChatWindow messages={messages} onSend={handleSend} />
    </div>
  );
};

export default ChatLayout;
