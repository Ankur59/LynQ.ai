import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export async function register({
  email,
  password,
  userName,
  full_name,
}: {
  email: string;
  password: string;
  userName: string;
  full_name: string;
}) {
  const response = await api.post("/api/v1/auth/register", {
    email,
    userName,
    password,
    full_name,
  });
  return response.data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post("/api/v1/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function verifyMail({ token }: { token: string }) {
  const response = await api.post("/api/v1/auth/verify-token", {
    token,
  });
  return response.data;
}
