import { useSelector } from "react-redux";
import LoadingOverlay from "../../../../components/common/Loading";
import LoginCard from "./LoginCard";

const LoginPage = () => {
  const loading = useSelector((state: any) => state.auth.loading);
  return (
    <>
      <div className="w-1/2 border-r hidden md:flex md:flex-col md:items-start gap-10 md:justify-around px-7 py-2 text-black border-r-[#C9BCA9] rounded-r-2xl">
        <LoadingOverlay isLoading={loading} />
        <div className="font-custom text-3xl">Field.</div>
        <div>
          <div className="font-custom text-6xl">Intelligence that</div>
          <div className="font-custom text-6xl">belongs to you.</div>
        </div>
        <div className="font-custom font-extralight">
          <div>Ask anything. </div>
          <div>
            We gather, structure, and deliver answers you can actually use.
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center w-full  justify-center">
        <LoginCard />
      </div>
    </>
  );
};

export default LoginPage;
