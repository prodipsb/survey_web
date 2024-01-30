import Image from "next/image";
import React from "react";
import user from "../../assets/user.png";
import moment from "moment";

const ViewUser = ({ userView, setUserView }) => {
  return (
    <div>
      <div className="mt-5 w-[90%] mx-auto text-[16px] border-b-blue-300 pb-5">
        <Image
          src={
            userView?.avatar
              ? `${process.env.NEXT_PUBLIC_IMAGE + userView?.avatar}`
              : user
          }
          alt="user avatar"
          height={150}
          width={150}
          className="border rounded-full mx-auto shadow-md"
        />
        <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
          {userView?.name}
        </p>
        <div className="mb-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Employee ID : </span>
            {userView?.employee_id}
          </p>
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]"> Email : </span>
            {userView?.email}
          </p>
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Phone : </span>
            {userView?.phone}
          </p>
         
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Role : </span>
            {userView?.role?.name}
          </p>
          {userView?.supervisor?.role?.name && (
            <p className="mb-2 text-[#646C9A]">
              <span className="font-bold text-[14px]">Supervisor : </span>
              {userView?.supervisor?.role?.name}
            </p>
          )}
          {userView?.supervisor?.name && (
            <p className="mb-2 text-[#646C9A]">
              <span className="font-bold text-[14px]">Supervisor Name : </span>
              {userView?.supervisor?.name}
            </p>
          )}
       
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Country : </span>
            {userView?.country}
          </p>
          {userView?.zone && (
            <p className="mb-2 text-[#646C9A]">
              <span className="font-bold text-[14px]">Zone : </span>
              {userView?.zone}
            </p>
          )}
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Division: </span>
            {userView?.division}
          </p>
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Circle: </span>
            {userView?.circle}
          </p>
          {userView?.address && (
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Address: </span>
            {userView?.address}
          </p>
          )}
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Gender: </span>
            {userView?.gender}
          </p>
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Status: </span>
            {userView?.status}
          </p>
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Join date: </span>
            {moment(userView?.date_of_joining).format("DD-MM-YYYY")}
          </p>
          <p className="mb-2 text-[#646C9A]">
            <span className="font-bold text-[14px]">Bio: </span>
            {userView?.bio}
          </p>
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
  );
};

export default ViewUser;
