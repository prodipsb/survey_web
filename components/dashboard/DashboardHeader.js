import React from "react";
import HeaderCard from "./HeaderCard";
import Image from "next/image";
import background from "../../assets/sidebar.jpg";

function DashboardHeader({userStats}) {
  return (
    <div>
      <div className="absolute -z-100">
        <Image
          src={background}
          alt="background"
          className="w-screen lg:h-[235px] md:h-[235px] h-[350px]"
          quality={100}
        />
      </div>
      <HeaderCard preview={userStats} />
    </div>
  );
}

export default DashboardHeader;
