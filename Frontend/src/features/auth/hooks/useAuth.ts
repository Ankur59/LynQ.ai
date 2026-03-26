import { useDispatch } from "react-redux";
import { login, register } from "../service/auth.api";
import type { UserData } from "../auth.types";
import { AxiosError } from "axios";
import {
  setError,
  setIsAutheticated,
  setloading,
  setRole,
  setUser,
} from "../auth.slice";

const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    password,
    username,
    firstName,
    lastName,
  }: UserData) {
    try {
      dispatch(setloading(true));
      register({
        email: email,
        password: password,
        userName: username,
        full_name: `${firstName} ${lastName}`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          setError(error.response?.data.message || "Registration Failed"),
        );
      }
    } finally {
      dispatch(setloading(false));
    }
  }

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      // console.log(email, password);
      dispatch(setloading(true));

      const response = await login({ email, password });

      console.log(response);

      dispatch(setUser(response.data.user));
      dispatch(setRole(response.data.user.role));
      console.log("this is role", response.data.user.role);
      dispatch(setIsAutheticated(true));

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          setError(
            error.response?.data.message || "Got some error while logging in!",
          ),
        );

        return false;
      }
      return false;
    } finally {
      dispatch(setloading(false));
    }
  }

  return { handleRegister, handleLogin };
};

export default useAuth;
