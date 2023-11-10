import Image from "next/image";
import React, { useState } from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
import { TbAlignLeft } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import logo from "../../assets/logo-2.png";
import UserAction from "./UserAction";
import Notification from "./Notification";

const Navbar = ({ mobileView, setMobileView, largeView, setLargeView }) => {
  const [handleUserAction, setHandleUserAction] = useState(false);

  return (
    <div
      className={`h-[65px] bg-white border-b-[1px] flex items-center justify-between p-3 sticky top-0 z-10`}
    >
      <div className="flex items-center">
        <Image
          src={logo}
          className={`${largeView ? "hidden" : "px-3"} duration-300`}
          alt=""
          width="160"
          priority
        />
        <div className="ml-5 flex text-blue-500 cursor-pointer hover:text-blue-900">
          <RxDoubleArrowRight
            size={25}
            className="lg:block hidden duration-500"
            onClick={() => setLargeView(!largeView)}
          />
          <div className="lg:hidden flex justify-end absolute right-5 top-5 gap-3 text-gray-500">
            <TbAlignLeft
              size={25}
              className={`rotate-180 ${
                mobileView ? "hidden duration-300" : "block duration-300"
              }`}
              onClick={() => setMobileView(!mobileView)}
            />
            <BsThreeDotsVertical
              size={25}
              onClick={() => setHandleUserAction(!handleUserAction)}
            />
          </div>
        </div>
      </div>
      <div
        className={`items-center gap-3 lg:relative lg:h-[64px] lg:flex ${
          handleUserAction
            ? "h-[64px] w-screen left-0 right-0 fixed top-[65px] lg:top-0 lg:border-b-0 flex justify-end border-b-[1px] bg-white"
            : "hidden"
        }`}
      >
        <Notification />
        <UserAction />
      </div>
    </div>
  );
};

export default Navbar;
