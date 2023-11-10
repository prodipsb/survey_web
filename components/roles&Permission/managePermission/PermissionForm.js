import React, { useEffect, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const PermissionForm = ({ setShowPopup, setFormData, formData }) => {
  const outsideClick = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
  }, []);

  const handleOutsideClick = (e) => {
    if (outsideClick?.current && !outsideClick?.current?.contains(e.target)) {
      setShowPopup(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div ref={outsideClick}>
      <div className="h-[320px] w-[90%] md:w-[50%] lg:w-[30%] drop-shadow-lg bg-white rounded-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <AiOutlineCloseCircle
          className="absolute top-[-10px] right-[-10px] bg-white rounded-[50%] cursor-pointer"
          onClick={() => setShowPopup(false)}
          size={30}
        />
        <form className="flex flex-col items-center justify-center h-full ">
          <p className="mb-2 w-[90%] text-[14px]"> Role </p>
          <select
            required
            name="role"
            value={formData?.role}
            onChange={handleChange}
            className="mb-3 bg-gray-50 border border-gray-300 outline-none focus:border-blue-300 text-gray-900 text-sm rounded-lg w-[90%] p-2.5"
          >
            <option value="">Select Role</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
          </select>
          <p className="mb-2 w-[90%] text-[14px]"> Guard </p>
          <select
            required
            name="guard"
            value={formData?.guard}
            onChange={handleChange}
            className="mb-5 bg-gray-50 border border-gray-300 outline-none focus:border-blue-300 text-gray-900 text-sm rounded-lg w-[90%] p-2.5"
          >
            <option value="">Select Guard</option>
            <option value="Web">Web</option>
            <option value="Web1">Web1</option>
            <option value="Web2">Web2</option>
          </select>
          <p className="mb-2">Set Permission:</p>
          <div className="flex gap-5 mb-3">
            <div className="flex items-center">
              <input
                id="general"
                type="checkbox"
                name="acces"
                className="w-4 h-4 p-5 text-[#0ABB87] bg-gray-100 border-gray-300 rounded focus:ring-white"
              />
              <label
                htmlFor="general"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-[13px]"
              >
                General Settings
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="onboard"
                type="checkbox"
                name="access"
                className="w-4 h-4 p-5 text-[#0ABB87] bg-gray-100 border-gray-300 rounded focus:ring-white"
              />
              <label
                htmlFor="onboard"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-[13px]"
              >
                User Onboarding
              </label>
            </div>
          </div>
          <button className="border border-slate-400 text-[13px] text-gray-700 font-bold px-6 py-2 mt-1 rounded-md hover:bg-slate-400 hover:text-white drop-shadow-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PermissionForm;
