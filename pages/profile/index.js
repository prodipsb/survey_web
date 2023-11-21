import React, { useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import { useUserProfileQuery } from "../../redux/features/user/userApi";
import Image from "next/image";
import user from "../../assets/user.png";
import moment from "moment";
import UserProfileEdit from "../../components/userProfileEdit/Main";

const Profile = () => {
  const [update, setUpdate] = useState(null);
  const { data } = useUserProfileQuery();

  return (
    <div>
      {update ? (
        <UserProfileEdit update={update} setUpdate={setUpdate} />
      ) : (
        <div>
          <div className="mt-5 w-[90%] mx-auto text-[16px] border-b-blue-300 pb-5">
            <Image
              src={
                data?.data?.avatar
                  ? `${process.env.NEXT_PUBLIC_IMAGE + data?.data?.avatar}`
                  : user
              }
              alt=""
              height={150}
              width={150}
              className="border rounded-full mx-auto shadow-md"
            />
            <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
              {data?.data?.name}
            </p>
            <div className="mb-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Role: </span>
                {data?.data?.role?.name}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">User Email: </span>
                {data?.data?.email}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Mobile: </span>
                {data?.data?.phone}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Gender: </span>
                {data?.data?.gender}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Role: </span>
                {data?.data?.role?.name}
              </p>
              {data?.data?.supervisor?.name && (
                <p className="mb-2 text-[#646C9A]">
                  <span className="font-bold text-[14px]">Supervisor: </span>
                  {data?.data?.supervisor?.name}
                </p>
              )}
              {data?.data?.reporting_to?.name && (
                <p className="mb-2 text-[#646C9A]">
                  <span className="font-bold text-[14px]">Reporting to: </span>
                  {data?.data?.reporting_to?.name}
                </p>
              )}
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">City: </span>
                {data?.data?.city}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Division: </span>
                {data?.data?.division}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Location: </span>
                {data?.data?.location}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Status: </span>
                {data?.data?.status}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Bio: </span>
                {data?.data?.bio}
              </p>
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Join date: </span>
                {moment(data?.data?.date_of_joining).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="buton"
                onClick={() => setUpdate(data?.data)}
                className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthCheck(Profile);
