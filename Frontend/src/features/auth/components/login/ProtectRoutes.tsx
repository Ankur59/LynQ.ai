import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingOverlay from "../../../../components/common/Loading";

const ProtectRoutes = ({ roles }: { roles: string[] }) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const loading = useSelector((state: any) => state.auth.loading);
  const role = useSelector((state: any) => state.auth.role);

  return (
    <>
      <LoadingOverlay isLoading={loading} />
      {roles.includes(role) && isAuthenticated ? (
        <Outlet />
      ) : !isAuthenticated ? (
        <Navigate to={"/login"} replace />
      ) : (
        <div>You are unauthorized</div>
      )}
    </>
  );
};

export default ProtectRoutes;
