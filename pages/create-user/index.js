import React from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import UserCreation from "../../components/createUser/Main";

const CreateUser = () => {
  return <UserCreation />;
};

export default AuthCheck(CreateUser);
