import React, { useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import { Pagination } from "@mui/material";
import CustomTable from "../../components/common/table/CustomTable";
import Export from "../../components/common/export/Export";
import SurveyReportFilter from "../../components/common/reportFilter/SurveyReportFilter";
import { useServiceReportQuery } from "../../redux/features/report/deviceServiceReportApi";
import ServiceDetails from "../../components/service/ServiceDetails";

const ServiceReport = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    employee_id: "",
    search: "",
    start_date: "",
    end_date: "",
  });
  const [deviceService, setDeviceService] = useState(null);
  const { data } = useServiceReportQuery({ page: page, search: search });
  
  console.log('ms report', data)

  const handleChange = (event, value) => {
    setPage(value);
  };

  // console.log('search', search)

  const handleClick = (name, data) => {
    if (name === "view") {
      setDeviceService(data);
    }
  };

  console.log('dd search', search)

  return (
    <>
      {deviceService ? (
        <ServiceDetails deviceService={deviceService} setDeviceService={setDeviceService} />
      ) : (
        <div className="w-[95%] mx-auto">
          <h1 className="font-bold text-[#646C9A] text-[24px] text-center mt-5 mb-5">
             Services Report
          </h1>
          <SurveyReportFilter setSearch={setSearch} expUrl="/device-service-report" />
          <CustomTable
            headers={[
              { key: "date", label: "Date" },
              { key: "employeeID", label: "AO ID" },
              { key: "user", label: "AO Name" },
              {
                key: "binNumber",
                label: "BIN Number",
              },
              { key: "serialNumber", label: "Device Serial Number" },
              { key: "outletName", label: "Outlet Name" },
              { key: "deviceIssues", label: "Device Issues" },
              { key: "comment", label: "Comment" },
              { key: "status", label: "Status" },

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

export default AuthCheck(ServiceReport);
