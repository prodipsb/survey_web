import AuthCheck from "../components/authCheck/AuthCheck";
import MainDashboard from "../components/dashboard/Main";

const Home = () => {
  return (
      <MainDashboard />
  );
};

export default AuthCheck(Home);
