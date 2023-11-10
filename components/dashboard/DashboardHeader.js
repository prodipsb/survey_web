import React from "react";
import HeaderCard from "./HeaderCard";
import Image from "next/image";
import background from "../../assets/sidebar.jpg";

function DashboardHeader() {
  const preview = [
    { name: "Activity Officer", count: 1216 },
    { name: "Supervisor", count: 24 },
    { name: "Teritory Manager", count: 50 },
    { name: "Regional Manager", count: 10 },
  ];
  return (
    <div>
      <div className="absolute -z-100">
        <Image
          src={background}
          alt="background"
          className="w-screen lg:h-[128px] md:h-[235px] h-[350px]"
          quality={100}
        />
      </div>
      <HeaderCard preview={preview} />
    </div>
  );
}

export default DashboardHeader;
