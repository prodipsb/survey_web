import Image from "next/image";
import React from "react";
import user from "../../assets/user.png";

const ViewPerformanceReport = ({ viewData, setViewData }) => {
  return (
    <div>
      <div className="mt-5 w-[90%] mx-auto text-[16px] border-b-blue-300 pb-5">
        <Image
          src={
            viewData?.surveySubmittedUserAvatar
              ? `${
                  process.env.NEXT_PUBLIC_IMAGE +
                  viewData?.surveySubmittedUserAvatar
                }`
              : user
          }
          alt=""
          height={150}
          width={150}
          className="border rounded-full mx-auto shadow-md"
        />
        <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
          {viewData?.surveySubmittedUserName}
        </p>
        <div className="mb-5">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 border-b border-blue-500 pb-5">
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Date: </span>
              {viewData?.date}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Name: </span>
              {viewData?.surveySubmittedUserName}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Email: </span>
              {viewData?.surveySubmittedUserEmail}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Total Survey: </span>
              {viewData?.totalSurvey}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Total Uni Price: </span>
              {viewData?.totalUniPrice}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Total VAT: </span>
              {viewData?.totalVat}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Total Unite Price: </span>
              {viewData?.totalUniPrice}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Total SD: </span>
              {viewData?.totalSdPercent}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">
                Total Price Including VAT:{" "}
              </span>
              {viewData?.totalPriceIncludingVat}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">
                Total Price Excluding VAT:{" "}
              </span>
              {viewData?.totalPriceExcludingVat}
            </p>
          </div>
        </div>
        <p className="text-[18px] font-bold text-[#646C9A] mb-3">
          Additional information
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 border-b border-blue-500 pb-5">
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">Role: </span>
            {viewData?.user?.role?.name}
          </p>
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">Gender: </span>
            {viewData?.user?.gender}
          </p>
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">Bio: </span>
            {viewData?.user?.bio}
          </p>
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">Location: </span>
            {viewData?.usre?.location}
          </p>
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">City: </span>
            {viewData?.user?.city}
          </p>
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">Division: </span>
            {viewData?.user?.division}
          </p>
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">Status: </span>
            {viewData?.user?.status}
          </p>
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">Last Login: </span>
            {viewData?.user?.last_login}
          </p>
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">
              Last Logout:{" "}
            </span>
            {viewData?.user?.last_logout}
          </p>
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="buton"
            onClick={() => setViewData(null)}
            className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPerformanceReport;
