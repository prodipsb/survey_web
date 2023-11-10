import Link from "next/link";
import React from "react";
import { RxDotFilled } from "react-icons/rx";

const SubmenuList = ({ subMenu, pathname }) => {
  return (
    <>
      {subMenu?.map((data) => (
        <Link
          href={data?.href}
          key={data?.id}
          className={`animate-fade-sidebar flex items-center p-3 text-white hover:bg-[#38024cB3] hover:text-blue-500 px-11 h-[40px] text-[13px] ${
            pathname === data?.href && "bg-[#38024cB3] text-[#2DBDB6]"
          }`}
        >
          <p className="whitespace-nowrap ml-[15px] flex items-center gap-2">
            {data?.icon}
            <span
              className={`${
                pathname === data?.href ? "text-[#2DBDB6]" : "text-white"
              }`}
            >
              {data?.name}
            </span>
          </p>
        </Link>
      ))}
    </>
  );
};

export default SubmenuList;
