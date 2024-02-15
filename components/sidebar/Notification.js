import { Badge } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { BiBellPlus } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbBellRinging } from "react-icons/tb";
import background from "../../assets/user_bg.jpg";
import {
  useDeleteAllNotificationMutation,
  useGetNotificationQuery,
  useGetSingleNotificationMutation,
  useReadAllNotificationMutation,
} from "../../redux/features/notification/notificationApi";
import moment from "moment";

const Notification = () => {
  const [getSingleNotification] = useGetSingleNotificationMutation();

  const { data } = useGetNotificationQuery(
    {},
    {
      pollingInterval: 120000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  const [deleteAllNotification] = useDeleteAllNotificationMutation();
  const [readAllNotification] = useReadAllNotificationMutation();

  const [showNotification, setShowNotification] = useState(false);
  const outsideClick = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
  }, []);

  const handleOutsideClick = (e) => {
    if (!outsideClick?.current?.contains(e.target)) {
      setShowNotification(false);
    }
  };

  const notificationDetails = async (notification) => {
    getSingleNotification({ id: notification.id });
  };

  return (
    <div className="relative" ref={outsideClick}>
      <div
        className="cursor-pointer flex items-center gap-3 px-3 py-1.5 hover:bg-slate-50"
        onClick={() => setShowNotification(!showNotification)}
      >
        <Badge badgeContent={data?.data?.length ?? 0} color="error" max={99}>
          <TbBellRinging size={25} color="action" />
        </Badge>{" "}
      </div>
      {showNotification && (
        <div
          className={`animate-fade-in-down w-[320px] top-[51px] h-auto lg:right-[-50px] md:right-[-30px] right-[-50px] drop-shadow-lg bg-white rounded-md absolute`}
        >
          <div className="w-full h-[100px] flex items-center justify-center">
            <div className="absolute -z-10">
              <Image
                src={background}
                alt="background"
                className="h-[100px] w-[320px]"
                quality={100}
              />
            </div>
            <div className="flex gap-2">
              <p className="text-[15px] font-bold text-white">Notifications</p>
              <p className="text-white bg-[#0ABB87] px-3 py-0.5 rounded">
                {data?.data?.length ?? 0}
              </p>
            </div>
          </div>
          <div className="w-[90%] mx-auto flex justify-between mt-2 mb-3">
            <p
              className="text-[13px] cursor-pointer text-[#a7abc3] hover:text-blue-900"
              onClick={() => readAllNotification()}
            >
              Mark all as read
            </p>
            <p
              className="text-[13px] cursor-pointer text-[#a7abc3] hover:text-blue-900"
              onClick={() => deleteAllNotification()}
            >
              Delete All
            </p>
          </div>
          <div className="h-[300px] overflow-auto">
          {data?.data?.length ? (
            data?.data?.map((notification, index) => (
              <div
                key={index}
                className="flex items-center text-[13px] justify-between border-b-[1px] px-5 py-3 hover:bg-[#f7f8fa] cursor-pointer"
                onClick={() => notificationDetails(notification)}
              >
                <div className="flex items-center gap-3">
                  <BiBellPlus className="text-[#A7ABC3]" size={25} />
                  <div>
                    <p className="text-[rgba(0,0,0,0.5)] font-bold">
                      {notification.data.message}
                    </p>
                    <p className="text-[#A7ABC3]">
                      {moment(notification.created_at).fromNow()}
                    </p>
                  </div>
                </div>
                <MdKeyboardArrowRight className="text-[#A7ABC3]" size={20} />
              </div>
            ))
          ) : (
            <p className="py-3 text-center mb-3 text-blue-400 text-[14px]">No have no notification</p>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
