/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useCreateUserMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import Image from "next/image";

const UserProfileEdit = ({ update, setUpdate }) => {
  const [createUser, { isLoading, isSuccess, error }] = useCreateUserMutation();

  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  const handleInputChange = (e) => {
    setUpdate({
      ...update,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    Object.keys(update).forEach((key) => {
      if (key !== "role") {
        const value = update[key];
        formdata.append(key, value);
      }
    });
    createUser(formdata);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile successfully updated!");
      setUpdate(null);
    }

    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error]);

  return (
    <div>
      <div className="mt-5 w-[90%] mx-auto text-[13px] border-b-blue-300 pb-5">
        {update?.avatar && (
          <Image
            src={
              typeof update?.avatar === "string"
                ? `${process.env.NEXT_PUBLIC_IMAGE + update?.avatar}`
                : URL.createObjectURL(update?.avatar)
            }
            alt=""
            height={150}
            width={150}
            className="border rounded-full mx-auto shadow-md"
          />
        )}
        <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
          Profile Update
        </p>
        <form className="mb-5" onSubmit={handleSubmit}>
          <div className="md:flex lg:flex gap-10">
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">User Name*</p>
              <input
                className={inputStyle}
                type="text"
                name="name"
                value={update?.name}
                required
                placeholder="Example: John Doe"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">User Email*</p>
              <input
                className={inputStyle}
                type="email"
                name="email"
                readOnly
                value={update?.email}
                required
                placeholder="Example: user@gmail.com"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">User Mobile Number*</p>
              <input
                className={inputStyle}
                type="text"
                name="phone"
                value={update?.phone}
                required
                placeholder="Example: 01XXXXXXXXX"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="md:flex lg:flex gap-10">
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">Gender*</p>
              <select
                className={inputStyle}
                value={update?.gender}
                required
                name="gender"
                onChange={handleInputChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User City*</p>
              <input
                className={inputStyle}
                type="text"
                name="city"
                value={update?.city}
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User Division*</p>
              <input
                className={inputStyle}
                type="text"
                name="division"
                value={update?.division}
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="md:flex lg:flex gap-10">
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User Location*</p>
              <input
                className={inputStyle}
                type="text"
                name="location"
                value={update?.location}
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User Bio*</p>
              <textarea
                className={inputStyle}
                type="text"
                rows={1}
                value={update?.bio}
                name="bio"
                required
                placeholder="Example: user information"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">User Image*</p>
              <input
                className="relative bg-white m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding py-2 px-3 text-base font-normal text-[#AFABC3] transition duration-300 ease-in-out file:-mx-3 file:-my-2 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-primary focus:border-blue-300"
                type="file"
                name="avatar"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-5">
            <button
              disabled={isLoading}
              type="buton"
              onClick={() => setUpdate(null)}
              className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
            >
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileEdit;
