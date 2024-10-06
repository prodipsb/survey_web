import Image from "next/image";
import React from "react";

const ViewPushNotification = ({ viewUserNotification, setViewUserNotification }) => {
  return (
    <div>
      <div className="mt-5 w-[90%] mx-auto text-[13px] border-b-blue-300 pb-5">
       
        <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
          {viewUserNotification?.submitted_user}
        </p>
        <div className="mb-5">
          <div className="md:flex lg:flex gap-10">

            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Sender Name : </span>
                {viewUserNotification?.sender_name}
              </p>
            </div>

            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Receiver Name : </span>
                {viewUserNotification?.receiver_name}
              </p>
            </div>

            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Message Title: </span>
                {viewUserNotification?.message_title}
              </p>
            </div>
            
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Message: </span>
                {viewUserNotification?.message}
              </p>
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Read: </span>
                {viewUserNotification?.read}
              </p>
            </div>
          </div>
          <div className="md:flex lg:flex gap-10">
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Raed At: </span>
                {viewUserNotification?.read_at}
              </p>
            </div>
            
           
          </div>
         
          {/* <div className="md:flex lg:flex gap-10">
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">
                <span className="font-bold text-[14px]">Read Status: </span>
                {viewUserNotification?.read}
              </p>
            </div>
            
            
          </div> */}
          <div className="flex justify-center mt-5">
            <button
              type="buton"
              onClick={() => setViewUserNotification(null)}
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

export default ViewPushNotification;
