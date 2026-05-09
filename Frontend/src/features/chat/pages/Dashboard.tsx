import { useEffect } from "react";
import useChat from "../hooks/useChat";
import ChatLayout from "../components/layout/ChatLayout";

const Dashboard = () => {
  const chat = useChat();

  useEffect(() => {
    chat.initSocketConnection();
  }, []);

  return <ChatLayout />;
};

export default Dashboard;
