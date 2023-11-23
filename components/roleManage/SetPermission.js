/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  useGetPermissionQuery,
  usePermissionByRoleQuery,
  useSetUserPermissionMutation,
} from "../../redux/features/pemission/permissionApi";

const SetPermission = ({ permissionData, setPermissionData }) => {
  const [permission, setPermission] = useState([]);
  const { data } = useGetPermissionQuery({ pagination: 0 });
  const { data: rolePermissionData } = usePermissionByRoleQuery(
    permissionData?.id
  );
  const [setUserPermission, { isLoading, isSuccess }] =
    useSetUserPermissionMutation();
  const outsideClick = useRef();

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setPermissionData(null);
    }
  }, [isSuccess]);

  const handleOutsideClick = (e) => {
    if (outsideClick?.current && !outsideClick?.current?.contains(e.target)) {
      setPermissionData(null);
    }
  };

  const handleClick = (id) => {
    if (!permission.includes(id)) {
      setPermission([...permission, id]);
    } else {
      const remove = permission.filter((perm) => perm !== id);
      setPermission(remove);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserPermission({
      role_id: permissionData?.id,
      permissions: permission,
    });
  };

  return (
    <div ref={outsideClick}>
      <div className="h-auto w-[90%] md:w-[50%] lg:w-[30%] drop-shadow-lg bg-white rounded-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <AiOutlineCloseCircle
          className="absolute top-[-10px] right-[-10px] bg-white rounded-[50%] cursor-pointer"
          onClick={() => setPermissionData(null)}
          size={30}
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center h-full mt-10"
        >
          <p className="text-[#646C9A] text-[18px] mt-5">
            Permission for: {permissionData?.name}
          </p>
          <div className="w-full p-3 flex flex-wrap items-center justify-center gap-3">
            {data?.data?.data?.map((option) => (
              <div className="flex items-center" key={option?.id}>
                {rolePermissionData?.data?.hasOwnProperty(option?.id) ? (
                  <input
                    type="checkbox"
                    disabled={true}
                    checked={true}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                ) : (
                  <input
                    onChange={() => handleClick(option?.id)}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                )}
                <label className="ms-2 text-sm font-medium text-gray-700">
                  {option?.name}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className=" mb-10 flex justify-center items-center border border-slate-400 text-[13px] text-gray-700 font-bold px-6 py-2 mt-5 rounded-md hover:bg-slate-400 hover:text-white drop-shadow-md"
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
            {isLoading ? "Loading" : "Set Permission"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPermission;
