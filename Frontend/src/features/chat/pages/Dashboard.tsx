import ChatLayout from "../components/layout/ChatLayout";

const Dashboard = ({ socket }) => {
  return <ChatLayout socket={socket} />;
};

export default Dashboard;
