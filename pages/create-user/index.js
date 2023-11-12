import React from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import UserCreate from "../../components/createUser/Main";

const CreateUser = () => {
  return <UserCreate />;
};

export default AuthCheck(CreateUser);
