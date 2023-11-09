import React from "react";
import Image from "next/image";
import LoginForm from "../../components/loginForm/Main";
import background from "../../assets/bg-genex.jpeg";

const Login = () => {
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
