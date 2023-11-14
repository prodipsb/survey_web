import React from "react";
import Performance from "../../components/performanceReport/Main";
import AuthCheck from "../../components/authCheck/AuthCheck";

const PerformanceReport = () => {
  return <Performance />;
};

export default AuthCheck(PerformanceReport);
