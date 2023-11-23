import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGetGeneralSettingQuery } from "../../../redux/features/generalSetting/generalSettingApi";
import { useCreateGeneralSettingMutation } from "../../../redux/features/generalSetting/generalSettingApi";
import toast from "react-hot-toast";
import AuthCheck from "../../../components/authCheck/AuthCheck";

const PushNotification = () => {
  const [formData, setFormData] = useState({
    website_title: "",
    address: "",
    about: "",
    logo: "",
    favicon: null,
  });

  const formRef = useRef();

  const { data } = useGetGeneralSettingQuery();

  const [createGeneralSetting, { isLoading, isError, isSuccess, error }] =
    useCreateGeneralSettingMutation();

  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  useEffect(() => {
    if (data) {
      setFormData(data?.data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const convertedFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      convertedFormData.append(key, value);
    });

    createGeneralSetting(convertedFormData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Data successfully stored!");
      formRef.current.reset();
    }

    if (isError) {
      toast.error("Something went wrong..." + isError);
    }
  }, [isSuccess, isError]);

  return (
    <div className="mt-5 w-[90%] lg:w-[40%] md:w-[60%] mx-auto text-[13px] border-b-blue-300 pb-5">
      <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
        Push Notification
      </p>
      <form className="mb-5" onSubmit={handleSubmit} ref={formRef}>
        <div className="gap-10">
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">Secret ID*</p>
            <input
              className={inputStyle}
              type="text"
              name="website_title"
              required
              // value={formData?.website_title}
              placeholder="Example: website"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">FCM</p>
            <input
              className={inputStyle}
              type="text"
              name="address"
              // value={formData?.address}
              placeholder="Example: address"
              onChange={handleInputChange}
            />
            {error && (
              <p className="text-red-500 mt-1">
                {error?.data?.message?.address}
              </p>
            )}
          </div>
          <div className="w-full mb-5">
            <p className="mb-2 text-[#646C9A]">Message</p>
            <textarea
              className={inputStyle}
              type="text"
              rows={3}
              name="about"
              // value={formData?.about}
              placeholder="Example: user information"
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
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthCheck(PushNotification);
