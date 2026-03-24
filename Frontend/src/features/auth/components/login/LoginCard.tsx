import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    // console.log(email, password);
    const success: boolean = await handleLogin({ email, password });
    if (success) {
      navigate("/chat");
    }
  };

  return (
    <div className="px-3 py-3 flex flex-col gap-4">
      <div>
        <div className="font-custom text-4xl">Login to your</div>
        <div className="font-custom text-3xl font-extralight">Intelligence</div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-[#C9BCA9] w-70 px-5 py-2 rounded-xl focus:ring-0 focus:outline-none"
          placeholder="ankur@gmail.com"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-[#C9BCA9] w-70 px-5 py-2 rounded-xl focus:ring-0 focus:outline-none"
          placeholder="YourPassword"
        />

        <button
          type="submit"
          disabled={!email || !password}
          className="group w-70 px-5 py-2 rounded-2xl font-medium flex items-center gap-2 justify-center
             bg-black text-white hover:cursor-pointer
             disabled:bg-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>Start Your</span>

          <span className="relative h-6 overflow-hidden font-custom pt-0.5">
            <span className="flex flex-col transition-transform duration-300 group-hover:-translate-y-6">
              <span>Intelligence</span>
              <span className="text-amber-500">Thinking !</span>
            </span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
