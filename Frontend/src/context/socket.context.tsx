import { createContext, useContext, useState } from "react";
import type { Socket } from "socket.io-client";
import { initSocketConnection } from "../features/chat/service/chat.socket";

type SocketContextType = {
  socket: Socket | null;
  connectSocket: () => Promise<void>;
  disconnectSocket: () => void;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connectSocket: async () => {},
  disconnectSocket: () => {},
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = async () => {
    const instance = await initSocketConnection();
    setSocket(instance);
  };

  const disconnectSocket = () => {
    socket?.disconnect();
    setSocket(null);
  };

  const Provider = SocketContext.Provider; // ← extract it

  return (
    <Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </Provider>
  );
};

export default SocketContext;
