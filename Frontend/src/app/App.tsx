import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import ProtectRoutes from "../features/auth/components/login/ProtectRoutes";
import PersitsLogin from "../features/auth/components/login/persitsLogin";
import UnauthenticatedRoute from "../features/auth/components/login/UnauthenticatedRoute";

function App() {
  return (
    <Routes>
      <Route element={<UnauthenticatedRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Authenticated routes state from here */}
      <Route element={<PersitsLogin />}>
        <Route element={<ProtectRoutes roles={["user"]} />}>
          <Route path="/chat" element={<div>this is user only route</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
