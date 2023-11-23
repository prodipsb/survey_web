import React, { useState } from "react";
import Navbar from "./Navbar";
import NavDropdown from "./NavDropdown";
import { RxCross2 } from "react-icons/rx";
import SingleLink from "./SingleLink";
import { adminNav } from "../../static-data/adminNavData";
import { useRouter } from "next/router";
import Image from "next/image";
import background from "../../assets/sidebar-bg.jpg";
import { useUserProfileQuery } from "../../redux/features/user/userApi";

const Main = ({ children }) => {
  const [mobileView, setMobileView] = useState(false);
  const [largeView, setLargeView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { data } = useUserProfileQuery();
  const { pathname } = useRouter();
  return (
    <div>
      <Navbar
        mobileView={mobileView}
        setMobileView={setMobileView}
        largeView={largeView}
        setLargeView={setLargeView}
        userData={data?.data}
      />
      <div className="flex relative">
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`fixed left-0 h-screen ${
            !largeView
              ? "lg:w-[21%] 2xl:w-[14%] md:w-[35%] w-[60%]"
              : isHovering
              ? "lg:w-[21%] 2xl:w-[14%] md:w-[35%] w-[60%]"
              : "w-[6%] 2xl:w-[4%] lg:w-auto"
          }h-screen lg:top-[64px] ${
            mobileView
              ? "block top-0 duration-300"
              : "hidden lg:block duration-300"
          } z-20`}
        >
          <div className="absolute -z-10">
            <Image
              src={background}
              alt="background"
              className="h-screen w-screen"
              priority
              quality={100}
            />
          </div>
          <div className="h-[calc(100%-100px)] overflow-y-auto side_scrollbar scroll-smooth mt-7">
            {adminNav?.map((nav) =>
              nav?.single ? (
                <SingleLink
                  key={nav?.id}
                  largeView={largeView}
                  isHovering={isHovering}
                  nav={nav}
                  pathname={pathname}
                  permission={data?.data?.permissions}
                />
              ) : (
                <NavDropdown
                  key={nav?.id}
                  largeView={largeView}
                  isHovering={isHovering}
                  nav={nav}
                  pathname={pathname}
                  permission={data?.data?.permissions}
                />
              )
            )}
          </div>
          <RxCross2
            size={20}
            className="absolute top-1 right-3 lg:hidden bg-[#ffffff] opacity-20 rounded-sm drop-shadow-sm"
            onClick={() => setMobileView(!mobileView)}
          />
        </div>
        <div
          className={`${
            largeView
              ? "lg:w-[94%] min-h-[calc(100vh-65px)] 2xl:w-[96%] 2xl:left-[4%] lg:left-[6%] duration-300 w-full lg:relative bg-[rgb(239,240,245)]"
              : "lg:w-[79%] min-h-[calc(100vh-65px)] 2xl:w-[86%] 2xl:left-[14%] lg:left-[21%] duration-300 lg:relative w-full bg-[rgb(239,240,245)]"
          } `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Main;
