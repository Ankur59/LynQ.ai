import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useRefresh from "../../hooks/useRefresh";
import { AxiosError } from "axios";
import { Outlet } from "react-router-dom";

const PersitsLogin = () => {
  const { loading, isAuthenticated } = useSelector((state: any) => state.auth);

  const isCalledRef = useRef(false); 
  const refresh = useRefresh();

  useEffect(() => {
    const validateUser = async () => {
      try {
        if (!isCalledRef.current) {
          isCalledRef.current = true;
          await refresh();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
        }
      }
    };

    if (!isAuthenticated && !isCalledRef.current) {
      validateUser();
    }
  }, [isAuthenticated, refresh]);

  return <>{loading ? <div>Loading......</div> : <Outlet />}</>;
};

export default PersitsLogin;
