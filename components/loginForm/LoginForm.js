/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiFillUnlock, AiFillAndroid } from "react-icons/ai";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/features/login/loginSlice";
import { useLoginUserMutation } from "../../redux/features/login/loginApi";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import store from "../../redux/store";
import { clearCache } from "../../redux/api/cacheSlice";

const LoginForm = ({ setForgotPassword }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
    login_mode: "web login",
  });
  const [loginUser, { data, error }] = useLoginUserMutation();

  const handleChange = (e) => {
    const newData = { ...signinData };
    newData[e.target.name] = e.target.value;
    setSigninData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(signinData);
  };

  useEffect(() => {
    if (data?.token_type) {
      dispatch(userLogin(data));
        // Dispatch an action to clear the cache upon successful login
       // store.dispatch(clearCache());
        dispatch(clearCache());
        const nextPage = router.query.redirect || '/';
        window.location.href = nextPage;

        // router.push(router?.query?.redirect ? router?.query?.redirect : "/");
      
    }
    if (data?.status == "error") {
      toast.error(data?.message);
    }
    // if (data?.email || data?.password) {
    //   toast.error("Credential missmatch...");
    // }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [data, error]);


  const handleAppDownload = () => {
    // Initiate the download
    const link = document.createElement('a');
    link.href = '/app/app-release.apk'; 
    link.setAttribute('download', 'tax-hub.apk'); // Specify the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Remove the link element after downloading
};

  return (
    <div>
      <Image
        className="w-[200px] h-[50px] mx-auto"
        src={logo}
        alt=""
        priority
      />
      <div className="flex items-center justify-center mt-5">
        <div>
          <h2 className="text-center font-bold text-white text-[15px] mb-5">
            SURVEY APPLICATION WEB PORTAL
          </h2>
          <div className="h-[430px] lg:h-[410px] md:h-[450px] 2xl:h-[500px] w-[95%] mx-auto md:w-[450px] lg:w-[395px] 2xl:w-[500px] md:[420px] bg-white rounded-tl-[20%] rounded-br-[20%]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-[80%] mx-auto"
            >
              <div className="relative w-full mt-[15%] 2xl:mt-[15%] md:mt-[15%] lg:mt-7">
                <input
                  type="text"
                  name="email"
                  required
                  onChange={handleChange}
                  className="bg-[#31a2b6] w-full p-2 rounded-[25px] outline-none placeholder:text-white caret-white text-white pl-9"
                  placeholder="Email / Employee ID"
                />
                <AiOutlineUser
                  size={20}
                  className="absolute top-2.5 left-2.5 text-white"
                />
              </div>
              <div className="relative w-full mt-5">
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  className="bg-[#31a2b6] w-full p-2 rounded-[25px] outline-none placeholder:text-white caret-white text-white pl-9"
                  placeholder="password"
                />
                <AiFillUnlock
                  size={20}
                  className="absolute top-2.5 left-2.5 text-white"
                />
              </div>
              <p
                className="flex justify-end w-[100%] mr-7 mt-4 text-[15px] text-[#31a2b6] font-thin cursor-pointer"
                onClick={() => setForgotPassword(true)}
              >
                Forget Password ?
              </p>
              <button
                type="submit"
                className="bg-[#2dbdb6] pt-[2%] pb-[2%] w-[32%] rounded-[25px] mt-5 text-white hover:drop-shadow-lg"
              >
                LOGIN
              </button>
            </form>
            <p className="text-[13px] text-[#2dbdb6] font-thin ml-[10%] mt-5">
              * For any assistance please contact with admin.
            </p>
            <hr className="w-[80%] mx-auto bg-blue-500 mt-5" />
            <p className="text-[#2dbdb6] text-[13px] text-center mt-5">
              Download Our Apps
            </p>
            <div className="flex justify-center w-[80%] mx-auto pt-5">
              <button onClick={handleAppDownload} className="w-[45%] border-[#2dbdb6] border-[1px] pt-1 pb-1 text-[#2dbdb6] flex justify-center items-center rounded-md font-thin hover:bg-[#2dbdb6] hover:text-white">
                <AiFillAndroid /> <span className="ml-2">ANDROID</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
