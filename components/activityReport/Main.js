import React, { useRef, useState } from "react";
import CustomTable from "../common/table/CustomTable";
import { Pagination } from "@mui/material";
import { useMasterReportQuery } from "../../redux/features/report/activityReportApi";
import ViewActivityReport from "./ViewActivityReport";

const ActivityReport = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [viewData, setViewData] = useState(null);
  const { data } = useMasterReportQuery({ page: page, search: search });
  const inputRef = useRef();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (name, data) => {
    if (name === "view") {
      setViewData(data);
    }
  };

  return (
    <>
      {viewData ? (
        <ViewActivityReport viewData={viewData} setViewData={setViewData} />
      ) : (
        <div className="w-[95%] mx-auto">
          <h1 className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
            Employee List
          </h1>
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
          <CustomTable
            headers={[
              { key: "date", label: "Date" },
              { key: "submitted_user_name", label: "Submitted By" },
              { key: "submitted_user_mobile", label: "Submitted User Mobile" },
              { key: "binHolderName", label: "BIN Holder Name" },
              { key: "binHolderMobile", label: "BIN Holder Mobile" },
              { key: "division", label: "Division" },
              { key: "subDivision", label: "Sub Division" },
              { key: "circle", label: "circle" },
              { key: "shopName", label: "Shop Name" },
              {
                key: "businessRegisteredAddress",
                label: "Business Registered Address",
              },
              { key: "outletAddress", label: "Outlet Address" },
              { key: "category", label: "Category" },
              { key: "subCategory", label: "Sub Category" },
              { key: "numberOfOutlet", label: "Number of Outlet" },
              { key: "numberOfCounter", label: "Number of Counter" },
              { key: "transactionType", label: "Transaction Type" },
              { key: "monthlyAverageSales", label: "Monthly Average Sales" },
              {
                key: "monthlyAverageCustomer",
                label: "Monthly Average Customer",
              },
              { key: "onlineSaleAvailable", label: "Online Sale Available" },
              { key: "action", label: "Action" },
            ]}
            data={data?.data}
            viewData={true}
            click={handleClick}
          />
          <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
            <Pagination
              count={data?.meta?.last_page}
              page={page}
              shape={"rounded"}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityReport;
