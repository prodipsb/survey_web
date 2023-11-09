import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubDropdown from "./SubDropdown";

const NavDropdown = ({ largeView, isHovering, nav, pathname }) => {
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
    <div>
      <div
        className={`h-[44px] flex flex-col items-center gap-3 p-3 text-white cursor-pointer hover:bg-[#38024cB3] hover:w-[100%] ${
          showDropdown ? "bg-[#38024cB3] text-[#2DBDB6]" : ""
        }`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="flex items-center justify-between w-full px-3 h-full">
          <div className="flex items-center gap-3 text-[13px] whitespace-nowrap">
            <p>{nav?.icon} </p>{" "}
            <p
              className={`${
                isHovering ? "block" : largeView ? "hidden" : "block"
              }`}
            >
              {nav?.name}
            </p>
          </div>
          <MdKeyboardArrowRight
            className={`${
              showDropdown ? "rotate-90 duration-300" : "duration-300"
            }
            ${
              isHovering
                ? "block duration-300"
                : largeView
                ? "hidden duration-300"
                : "block duration-300"
            }`}
            size={20}
          />
        </div>
      </div>
      <div
        className={`${
          (!largeView && showDropdown) || (isHovering && showDropdown)
            ? "animate-fade-sidebar"
            : "hidden"
        }`}
      >
        <>
          {nav?.navData?.map((data) =>
            data?.single ? (
              <Link
                href={data?.href}
                key={data?.id}
                className={`flex items-center p-3 text-white hover:bg-[#38024cB3] hover:text-blue-500 px-6 h-[40px] text-[13px] ${
                  pathname === data?.href && "bg-[#38024cB3] text-[#2DBDB6]"
                }`}
              >
                <p className="whitespace-nowrap flex items-center gap-3 px-3">
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
            ) : (
              <SubDropdown key={data?.id} nav={data} pathname={pathname} />
            )
          )}
        </>
      </div>
    </div>
  );
};

export default NavDropdown;
