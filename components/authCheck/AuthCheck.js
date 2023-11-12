/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/features/login/loginSlice";

const AuthCheck = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const token = useSelector((state) => state?.loginInfo?.access_token);

    useEffect(() => {
      if (!token) {
        router.push(
          {
            pathname: "/login",
            query: { redirect: router.pathname },
          },
          "/login",
          { shallow: true }
        );
        dispatch(userLogin({ access_token: "", token_type: "" }));
      }
    }, [token, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default AuthCheck;
