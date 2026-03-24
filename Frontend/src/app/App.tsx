import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
