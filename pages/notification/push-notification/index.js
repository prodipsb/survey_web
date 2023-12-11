import React, { useEffect, useRef, useState } from "react";
import { useGetGeneralSettingQuery } from "../../../redux/features/generalSetting/generalSettingApi";
import toast from "react-hot-toast";
import AuthCheck from "../../../components/authCheck/AuthCheck";
import Multiselect from "multiselect-react-dropdown";
import { useGetDevicetokenQuery } from "../../../redux/features/pushNotification/pushNotificationApi";

const PushNotification = () => {
  const { data, loading } = useGetDevicetokenQuery();
  const [messageTo, setMessageTo] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image:`${process.env.NEXT_PUBLIC_IMAGE}/assets/notification-bell.png`,
    content_available: true
  });

  const formRef = useRef();

  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageTo) {
      toast.error("Please select whom you want to send...");
    } else {
      setIsloading(true);
      const messageToken = messageTo?.map((item) => item?.device_token);
      try {

        const response = await fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          body: JSON.stringify({ registration_ids: messageToken, notification: formData, priority: "high" }),
          headers: {
            "Content-type": "application/json",
            "Authorization": `key=${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_SECRET_KEY}`
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          toast.error(responseData.message || "Something went wrong");
        } else {
          toast.success("Notification send successfully!");
          formRef.current.reset();
          setMessageTo(null);
        }
        setIsloading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setIsloading(false);
      }
    }
  };

  return (
    <div className="mt-5 w-[90%] lg:w-[40%] md:w-[60%] mx-auto text-[13px] border-b-blue-300 pb-5">
      <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
        Push Notification
      </p>
      <form className="mb-5" onSubmit={handleSubmit} ref={formRef}>
        <div className="gap-10">
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">To*</p>
            <Multiselect
              options={data?.data}
              selectedValues={messageTo}
              onSelect={setMessageTo}
              onRemove={setMessageTo}
              displayValue="user"
              showCheckbox={true}
              style={{
                searchBox: {
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid #e2e5ec",
                },
              }}
              loading={loading}
            />
          </div>
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">Title*</p>
            <input
              className={inputStyle}
              type="text"
              name="title"
              required
              placeholder="Example: message title"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full mb-5">
            <p className="mb-2 text-[#646C9A]">Body*</p>
            <textarea
              className={inputStyle}
              type="text"
              rows={5}
              name="body"
              placeholder="Example: message body"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthCheck(PushNotification);
