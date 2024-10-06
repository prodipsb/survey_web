import React, { useEffect, useRef, useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import { useChangePasswordMutation } from "../../redux/features/login/loginApi";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const ChangePassword = () => {
  const router = useRouter();
  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, { isLoading, error }] = useChangePasswordMutation();
  const formRef = useRef();

  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  const handleInputChange = (e) => {
    setUpdatePassword({
      ...updatePassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatePassword?.password !== updatePassword?.password_confirmation) {
      toast.error("Both password should match...");
    } else {
      changePassword(updatePassword);
      formRef.current.reset();
      toast.success("User Password Updated Successfully!")
      router.push('/')
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong...");
    }
  }, [error]);

  return (
    <div className="mt-5 lg:w-[40%] w-[90%] md:w-[60%] mx-auto text-[13px] border-b-blue-300 pb-5">
      <p className="font-bold text-[#646C9A] text-[24px] text-center mt-5 mb-5">
        Change Password
      </p>
      <form className="mb-5" onSubmit={handleSubmit} ref={formRef}>
        <div className="gap-10">
          <div className="mb-5 w-full relative">
            <p className="mb-2 text-[#646C9A]">New Password*</p>
            <input
              className={inputStyle}
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Example: 123456"
              onChange={handleInputChange}
            />
            {showPassword ? (
              <IoIosEyeOff
                size={20}
                className="absolute right-3 top-10"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoMdEye
                size={20}
                className="absolute right-3 top-10"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <div className="mb-5 w-full relative">
            <p className="mb-2 text-[#646C9A]">Confirm Password*</p>
            <input
              className={inputStyle}
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              required
              placeholder="Example: 123456"
              onChange={handleInputChange}
            />
            {showConfirmPassword ? (
              <IoIosEyeOff
                size={20}
                className="absolute right-3 top-10"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <IoMdEye
                size={20}
                className="absolute right-3 top-10"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
          >
            {isLoading ? "Loading..." : "update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthCheck(ChangePassword);
