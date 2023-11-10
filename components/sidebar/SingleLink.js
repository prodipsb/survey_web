import Link from "next/link";
import React from "react";

const SingleLink = ({ largeView, isHovering, nav, pathname }) => {
  return (
    <Link
      className={`px-6 whitespace-nowrap hover:bg-[#38024cB3] flex items-center gap-3 p-3 text-white text-[13px] h-[44px] ${
        pathname === nav?.href && "bg-[#38024cB3] text-[#2DBDB6]"
      }`}
      href={nav?.href}
    >
      <p size={20}>{nav?.icon}</p>{" "}
      <p className={`${isHovering ? "block" : largeView ? "hidden" : "block"}`}>
        {nav?.name}
      </p>
    </Link>
  );
};

export default SingleLink;
