import { useEffect } from "react";
import useChat from "../hooks/useChat";

const Dashboard = () => {
  const chat = useChat();

  useEffect(() => {
    chat.initSocketConnection();
  }, []);
  return <div>helowwww</div>;
};

export default Dashboard;
