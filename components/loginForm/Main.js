import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import LoginForm from "./LoginForm";

const Main = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
      {forgotPassword ? (
        <ForgotPassword setForgotPassword={setForgotPassword} />
      ) : (
        <LoginForm setForgotPassword={setForgotPassword} />
      )}
    </div>
  );
};

export default Main;
