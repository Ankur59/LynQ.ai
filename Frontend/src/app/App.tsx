import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import ProtectRoutes from "../features/auth/components/login/ProtectRoutes";
import PersitsLogin from "../features/auth/components/login/persitsLogin";
import UnauthenticatedRoute from "../features/auth/components/login/UnauthenticatedRoute";
import Dashboard from "../features/chat/pages/Dashboard";
import useChat from "../features/chat/hooks/useChat";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";

function App() {
  const chat = useChat();

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const initializeSocket = async () => {
      const socketInstance = await chat.initSocketConnection();

      setSocket(socketInstance);
    };

    initializeSocket();

    // optional cleanup
    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route element={<UnauthenticatedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Authenticated routes state from here */}
      <Route element={<PersitsLogin />}>
        <Route element={<ProtectRoutes roles={["user"]} />}>
          <Route path="/chat" element={<Dashboard socket={socket} />} />
          <Route path="/chat/:id" element={<Dashboard socket={socket} />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
