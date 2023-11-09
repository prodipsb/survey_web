import React from "react";
import { useSelector } from "react-redux";

const IsAuth = ({ Component, pageProps }) => {
  const token = useSelector((state) => state);
  console.log(token);
  return <Component {...pageProps} />;
};

export default IsAuth;
