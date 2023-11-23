/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubmenuList from "./SubmenuList";

const SubDropdown = ({ nav, pathname }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (
      pathname
        ?.replaceAll(/\-/g, "")
        ?.includes(nav?.name?.toLowerCase()?.replaceAll(/\s/g, ""))
    ) {
      setShowDropdown(true);
    }
  }, [pathname]);

  return (
    <>
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className={`h-[40px] cursor-pointer flex items-center justify-between w-full px-6 p-3 text-white hover:bg-[#38024cB3] hover:text-[#2DBDB6] ${
          showDropdown ? "bg-[#38024cB3] text-[#2DBDB6]" : ""
        }`}
      >
        <div className="flex gap-3 text-[13px] px-3 h-full whitespace-nowrap">
          <p>{nav?.icon} </p> <p>{nav?.name}</p>
        </div>
        <MdKeyboardArrowRight
          className={`${
            showDropdown ? "rotate-90 duration-300" : "duration-300"
          }`}
          size={20}
        />
      </div>
      {showDropdown && (
        <SubmenuList subMenu={nav?.submenu} pathname={pathname} />
      )}
    </>
  );
};

export default SubDropdown;
