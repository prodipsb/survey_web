import React, { useEffect } from "react";
import Image from "next/image";
import LoginForm from "../../components/loginForm/Main";
import background from "../../assets/bg-genex.jpeg";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Login = () => {
  const token = useSelector((state) => state?.loginInfo?.access_token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <div>
      <div className="absolute -z-10">
        <Image
          src={background}
          alt="background"
          className="h-screen w-screen"
          quality={100}
        />
      </div>
      <LoginForm />
    </div>
  );
};
export default Login;
