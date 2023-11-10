import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import Image from "next/image";
import logo from "../../assets/logo.png";

const ForgotPassword = ({ setForgotPassword }) => {
  const [forgotMail, setForgotMail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(forgotMail);
  };
  return (
    <div>
      <Image
        className="w-[200px] h-[50px] mx-auto"
        src={logo}
        alt=""
        priority
      />
      <div className="mt-10 flex items-center justify-center">
        <div>
          <p className="text-[15px] text-white font-bold text-center mb-5">
            Forgotten Password ?
          </p>
          <p className="text-[14px] text-center mb-5 text-white font-semibold">
            Enter your email to reset your password
          </p>
          <div className="h-[230px] bg-white lg:w-[550px] md:w-[450px] w-[370px] rounded-tl-[100px] rounded-br-[100px] flex items-center">
            <form onSubmit={handleSubmit} className="w-[80%] mx-auto">
              <div className="relative">
                <input
                  type="email"
                  onChange={(e) => setForgotMail(e.target.value)}
                  required
                  className="bg-[#31a2b6] w-full p-2 rounded-[25px] outline-none placeholder:text-white caret-white text-white pl-9"
                  placeholder="yourmail@genexinfosys.com"
                />
                <MdOutlineEmail
                  size={20}
                  className="absolute top-3 left-3 text-white"
                />
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <button
                  type="submit"
                  className="text-[13px] border border-[#31a2b6] rounded-2xl text-[#31a2b6] px-5 py-1.5 hover:text-white hover:bg-[#31a2b6]"
                >
                  Request
                </button>
                <button
                  type="button"
                  onClick={() => setForgotPassword(false)}
                  className="text-[13px] border border-[#FD397A] rounded-2xl text-[#31a2b6] px-5 py-1.5 hover:text-white hover:bg-[#FD397A]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
