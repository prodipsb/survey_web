import React, { useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import { Pagination } from "@mui/material";
import CustomTable from "../../components/common/table/CustomTable";
import Export from "../../components/common/export/Export";
import ViewActivityReport from "../../components/activityReport/ViewActivityReport";
import { useMasterReportQuery } from "../../redux/features/report/activityReportApi";

const SurveyReport = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    search: "",
    start_date: "",
    end_date: "",
  });
  const [viewData, setViewData] = useState(null);
  const { data } = useMasterReportQuery({ page: page, search: search });

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
          <h1 className="font-bold text-[#646C9A] text-[24px] text-center mt-5 mb-5">
            Survey Report
          </h1>
          <Export setSearch={setSearch} expUrl="/master-report" />
          <CustomTable
            headers={[
              { key: "date", label: "Date" },
              { key: "surveySubmittedUserName", label: "Name" },
              {
                key: "surveySubmittedUserPhone",
                label: "Mobile Number",
              },
              { key: "role", label: "Role" },
              { key: "supervisor", label: "Supervisor" },
              { key: "binNumber", label: "BIN Number" },
              { key: "binHolderName", label: "BIN Holder" },
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
              { key: "transactionType", label: "Transaction Type" },
              
              { key: "onlineSaleAvailable", label: "Online Sale Available" },
              { key: "weeklyHoliday", label: "Weekly Holiday" },
              { key: "action", label: "Action" },
            ]}
            data={data?.data}
            viewData={true}
            click={handleClick}
          />
          <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
          <p className="text-[#646C9A]">Total survey: {data?.meta?.total}</p>
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

export default AuthCheck(SurveyReport);
