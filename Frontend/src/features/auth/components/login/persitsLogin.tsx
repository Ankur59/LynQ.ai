import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefresh from "../../hooks/useRefresh";
import { AxiosError } from "axios";
import { Outlet } from "react-router-dom";

const PersitsLogin = () => {
  const { loading, isAuthenticated } = useSelector((state: any) => state.auth);
  const { refresh } = useRefresh();

  useEffect(() => {
    const validateUser = async () => {
      try {
        refresh();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
        }
      }
    };

    if (!isAuthenticated) {
      validateUser();
    }
  }, [isAuthenticated, refresh]);

  return <>{loading ? <div>Loading......</div> : <Outlet />}</>;
};

export default PersitsLogin;
