import React, { useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import { usePerformanceReportQuery } from "../../redux/features/report/performanceReport";
import { Pagination } from "@mui/material";
import CustomTable from "../../components/common/table/CustomTable";
import Export from "../../components/common/export/Export";
import ViewPerformanceReport from "../../components/viewPerformanceReport/Main";

const PerformanceReport = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    search: "",
    start_date: "",
    end_date: "",
  });
  const [viewData, setViewData] = useState(null);
  const { data } = usePerformanceReportQuery({ page: page, search: search });

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
        <ViewPerformanceReport viewData={viewData} setViewData={setViewData} />
      ) : (
        <div className="w-[95%] mx-auto">
          <h1 className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
            Performance Report
          </h1>
          <Export setSearch={setSearch} expUrl="/master-report" />
          <CustomTable
            headers={[
              {
                label: "Name",
                nested: {
                  name: "surveySubmittedUserName",
                  avatar: "surveySubmittedUserAvatar",
                },
              },
              { key: "surveySubmittedUserEmail", label: "Email" },
              { key: "surveySubmittedUserPhone", label: "Phone" },
              { key: "totalSurvey", label: "Total Survey" },
              { key: "totalUniPrice", label: "Total Unite Price" },
              { key: "totalVat", label: "Total Vat" },
              { key: "totalSdPercent", label: "Total SD Percent" },
              {
                key: "totalPriceIncludingVat",
                label: "Total Price Including VAT",
              },
              {
                key: "totalPriceExcludingVat",
                label: "Total Price Excluding VAT",
              },
              { key: "action", label: "Action" },
            ]}
            data={data?.data?.data}
            viewData={true}
            click={handleClick}
          />
          <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
            <Pagination
              count={data?.data?.last_page}
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

export default AuthCheck(PerformanceReport);
