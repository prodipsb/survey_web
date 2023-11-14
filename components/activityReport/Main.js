import React, { useRef, useState } from "react";
import CustomTable from "../common/table/CustomTable";
import { Pagination } from "@mui/material";
import { useMasterReportQuery } from "../../redux/features/report/activityReportApi";

const ActivityReport = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data } = useMasterReportQuery({ page: page, search: search });
  const inputRef = useRef();

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="w-[95%] mx-auto">
      <h1 className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
        Employee List
      </h1>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Accept name, email, user type, location"
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
      {/* <CustomTable
        headers={[
          { key: "name", label: "Name" },
          { key: "gender", label: "Gender" },
          { key: "phone", label: "Mobile" },
          { key: "email", label: "Email" },
          { key: "city", label: "City" },
          { key: "division", label: "Division" },
          { key: "country", label: "Country" },
          { key: "status", label: "Status" },
          { key: "date_of_joining", label: "Date of Joining" },
          { key: "role", label: "Role", nested: "name" },
          { key: "supervisor", label: "Supervisor", nested: "name" },
          { key: "report_to", label: "Reporting To", nested: "name" },
          { key: "user_type", label: "User Type" },
          { key: "action", label: "Action" },
        ]}
        data={data?.data?.data}
        viewData={true}
        editData={true}
        deleteData={true}
        click={handleClick}
      /> */}
      <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
        <Pagination
          count={data?.data?.total}
          page={page}
          shape={"rounded"}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ActivityReport;
