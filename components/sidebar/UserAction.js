import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import background from "../../assets/user_bg.jpg";
import Image from "next/image";

const UserAction = () => {
  const [showUserAction, setShowUserAction] = useState(false);
  const outsideClick = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
  }, []);

  const handleOutsideClick = (e) => {
    if (!outsideClick?.current?.contains(e.target)) {
      setShowUserAction(false);
    }
  };

  return (
    <div className="relative" ref={outsideClick}>
      <div
        className="cursor-pointer flex items-center gap-3 mr-2 px-3 py-1 hover:bg-slate-50"
        onClick={() => setShowUserAction(!showUserAction)}
      >
        <p className="text-[13px] hidden lg:block">
          Hi, <span className="ml-2">Admin</span>
        </p>
        <FaUserCircle size={30} />
      </div>
      {showUserAction && (
        <div
          className={`animate-fade-in-down w-[380px] top-[52px] h-auto lg:right-2 md:right-2 right-[10%] drop-shadow-lg bg-white rounded-md absolute`}
        >
          <div className="w-full h-[100px]">
            <div className="absolute -z-10">
              <Image
                src={background}
                alt="background"
                className="h-[100px] w-[380px]"
                quality={100}
              />
            </div>
            <div className="w-[90%] mx-auto flex items-center gap-3 h-full">
              <FaUserCircle size={35} />
              <p className="text-[15px] font-bold text-white">Admin</p>
            </div>
          </div>
          <div className="border-b-[1px]">
            <div className="w-[90%] mx-auto">
              <p className="text-[13px] cursor-pointer my-5 font-bold text-[#6c7293]">
                Change Password
              </p>
            </div>
          </div>
          <button className="mx-[5%] my-6 text-[12px] bg-[rgba(45,189,182,0.1)] text-[#2DBDB6] font-bold px-4 py-2 rounded-sm hover:bg-[#2dbdb6] hover:text-white">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAction;
