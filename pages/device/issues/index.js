import React, { useRef, useState } from "react";
import AuthCheck from "../../../components/authCheck/AuthCheck";
import { Pagination } from "@mui/material";
import DeviceIssuesManage from "../../../components/deviceIssues/Main";
import { useGetDeviceIssuesQuery } from "../../../redux/features/deviceIssue/issueApi";
import AddDeviceIssue from "../../../components/deviceIssues/AddDeviceIssue";

const DeviceIssues = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const inputRef = useRef();

  const { data } = useGetDeviceIssuesQuery({
    pagination: 1,
    page: page,
    search: search,
  });

  // console.log('device issues', data)

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className="w-[95%] mx-auto">
        <h1 className="font-bold text-[#646C9A] text-[24px] mt-5 mb-5">
          Device Issues
        </h1>
        <div className="flex justify-between flex-wrap gap-y-2">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter search value"
              ref={inputRef}
              className="px-5 py-2 rounded-md placeholder:text-[12px] outline-none w-[75%] md:w-auto lg:w-auto"
            />
            <button
              onClick={() => setSearch(inputRef.current.value)}
              className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            >
              Search
            </button>
          </div>
            <button
              onClick={() => setShowPopup(true)}
              className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            >
              + Create new
            </button>
          
        </div>


        <DeviceIssuesManage values={data} setShowPopup={setShowPopup}/>


        <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
          <p className="text-[#646C9A]">
            Total issues: {data?.meta?.total}
          </p>
          <Pagination
            count={data?.meta?.last_page}
            page={page}
            shape={"rounded"}
            onChange={handleChange}
          />
        </div>
      </div>
      {showPopup && <AddDeviceIssue setShowPopup={setShowPopup} />}
    </div>
  );
};

export default AuthCheck(DeviceIssues);
