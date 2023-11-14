import React from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import Activity from "../../components/activityReport/Main";

const ActivityReport = () => {
  return <Activity />;
};

export default AuthCheck(ActivityReport);
