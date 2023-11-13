import Image from "next/image";
import React from "react";

const ViewUser = ({ userView, setUserView }) => {
  return (
    <div>
      <div className="mt-5 w-[90%] mx-auto text-[13px] border-b-blue-300 pb-5">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE + userView?.avatar}`}
          alt=""
          height={150}
          width={150}
          className="border rounded-full mx-auto shadow-md"
        />
        <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
          {userView?.name}
        </p>
        <div className="mb-5">
          <div className="md:flex lg:flex gap-10 text-center">
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">User Email: </span>
                {userView?.email}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Mobile: </span>
                {userView?.phone}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Gender: </span>
                {userView?.gender}
              </p>
            </div>
          </div>
          <div className="md:flex lg:flex gap-10 text-center">
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Role: </span>
                {userView?.role?.name}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Supervisor: </span>
                {userView?.supervisor_id}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Reporting to: </span>
                {userView?.reporting_role_id}
              </p>
            </div>
          </div>
          <div className="md:flex lg:flex gap-10 text-center">
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">City: </span>
                {userView?.city}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Division: </span>
                {userView?.division}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Location: </span>
                {userView?.location}
              </p>
            </div>
          </div>
          <div className="md:flex lg:flex gap-10 text-center">
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Status: </span>
                {userView?.status}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Bio: </span>
                {userView?.bio}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Join date: </span>
                {userView?.date_of_joining}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="buton"
              onClick={() => setUserView(null)}
              className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
