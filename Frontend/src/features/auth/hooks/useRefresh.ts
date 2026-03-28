import { api } from "../service/auth.api";
import { useDispatch } from "react-redux";
import { setIsAutheticated, setloading, setRole, setUser } from "../auth.slice";
import { AxiosError } from "axios";

const useRefresh = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      dispatch(setloading(true));
      const response = await api.post("/auth/refresh");
      dispatch(setUser(response.data.data.user));
      dispatch(setRole(response.data.data.user.role));
      dispatch(setIsAutheticated(true));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("asd");
      }
    } finally {
      dispatch(setloading(false));
    }
  };
  return refresh;
};

export default useRefresh;
