import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGetGeneralSettingQuery } from "../../../redux/features/generalSetting/generalSettingApi";
import { useCreateGeneralSettingMutation } from "../../../redux/features/generalSetting/generalSettingApi";
import toast from "react-hot-toast";
import AuthCheck from "../../../components/authCheck/AuthCheck";
import Switch from '@mui/material/Switch';
import ToggleSwitch from "../../../components/switch/ToggleSwitch";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const GeneralSetting = () => {

  const [formData, setFormData] = useState({
    website_title: "",
    address: "",
    about: "",
    logo: "",
    favicon: null,
    googleMap: false,
    leafletMap: false
  });

  const formRef = useRef();

  const { data } = useGetGeneralSettingQuery();

  const [createGeneralSetting, { isLoading, isError, isSuccess, error }] =
    useCreateGeneralSettingMutation();

  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  useEffect(() => {
    if (data) {

      const { id, website_title, about, address, googleMap, leafletMap } = data.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        id,
        website_title,
        about,
        address,
        googleMap,
        leafletMap,
      }));

      // setFormData(data?.data);
    }
  }, [data]);


  const handleInputChange = (e) => {
    const { name, type } = e.target;
  
    if (type === 'checkbox') {
      const value = e.target.checked ? 1 : 0;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (type === 'file') {
      // If it's a file input, set the value to the first selected file
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.files[0],
      }));
    } else {
      // For other types of inputs, set the value directly
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.value,
      }));
    }
  };

  

  // const handleInputChange = (e) => {
    
  //   console.log('hell', e.target.name)
  //   console.log('hell value', e.target.value)
  //   setFormData({
  //     ...formData,
  //     [e.target.name]:
  //       e.target.type === "file" ? e.target.files[0] : e.target.value,
  //   });
  // };

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
    <div className="mt-5 lg:w-[40%] w-[90%] md:w-[60%] mx-auto text-[13px] border-b-blue-300 pb-5">
      <p className="font-bold text-[#646C9A] text-[24px] text-center mt-5 mb-5">
        General Setting
      </p>
      <form className="mb-5" onSubmit={handleSubmit} ref={formRef}>
        <div className="gap-10">
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">Website Title*</p>
            <input
              className={inputStyle}
              type="text"
              name="website_title"
              required
              value={formData.website_title}
              placeholder="Example: website"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">Address</p>
            <input
              className={inputStyle}
              type="text"
              name="address"
              value={formData.address}
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
            <p className="mb-2 text-[#646C9A]">About</p>
            <textarea
              className={inputStyle}
              type="text"
              rows={3}
              name="about"
              value={formData.about}
              placeholder="Example: user information"
              onChange={handleInputChange}
            />
          </div>

          <div className="gap-10">
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">Google Map</p>
            <ToggleSwitch
              checked={formData.googleMap}
              onChange={handleInputChange}
              name="googleMap"
              label="Google Map"
            />
            {/* <Switch {...label} defaultChecked /> */}
          </div>
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">Third Party</p>
            <ToggleSwitch
              checked={formData.leafletMap}
              onChange={handleInputChange}
              name="leafletMap"
              label="Leaflet Map"
            />
            {error && (
              <p className="text-red-500 mt-1">
                {error?.data?.message?.address}
              </p>
            )}
          </div>

        </div>

          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]"> Logo</p>
            <input
              className="relative bg-white m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding py-2 px-3 text-base font-normal text-[#AFABC3] transition duration-300 ease-in-out file:-mx-3 file:-my-2 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-primary focus:border-blue-300"
              type="file"
              name="logo"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]"> Favicon</p>
            <input
              className="relative bg-white m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding py-2 px-3 text-base font-normal text-[#AFABC3] transition duration-300 ease-in-out file:-mx-3 file:-my-2 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-primary focus:border-blue-300"
              type="file"
              name="favicon"
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

export default AuthCheck(GeneralSetting);
