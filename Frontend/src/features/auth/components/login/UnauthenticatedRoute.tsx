import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const UnauthenticatedRoute = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state: any) => state.auth);
  return (
    <>
      {!loading && isAuthenticated ? (
        // window.history.length > 1 ? (
        //   navigate(-1)
        // ) : (
          navigate("/chat")
        // )
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default UnauthenticatedRoute;
