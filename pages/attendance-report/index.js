import React, { useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import { Pagination } from "@mui/material";
import CustomTable from "../../components/common/table/CustomTable";
import Export from "../../components/common/export/Export";
import ViewActivityReport from "../../components/activityReport/ViewActivityReport";
import { useAttendanceReportQuery } from "../../redux/features/report/attendanceReportApi";
import SurveyReportFilter from "../../components/common/reportFilter/SurveyReportFilter";
import AttendanceDetails from "../../components/attendance/AttendanceDetails";

const AttendanceReport = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    employee_id: "",
    search: "",
    start_date: "",
    end_date: "",
  });
  const [viewData, setViewData] = useState(null);
  const { data } = useAttendanceReportQuery({ page: page, search: search });
  
  console.log('ms report', data)

  const handleChange = (event, value) => {
    setPage(value);
  };

  // console.log('search', search)

  const handleClick = (name, data) => {
    if (name === "view") {
      setViewData(data);
    }
  };

  return (
    <>
      {viewData ? (
        <AttendanceDetails viewData={viewData} setViewData={setViewData} />
      ) : (
        <div className="w-[95%] mx-auto">
          <h1 className="font-bold text-[#646C9A] text-[24px] text-center mt-5 mb-5">
            Attendance Report
          </h1>
          <SurveyReportFilter setSearch={setSearch} expUrl="/attendance-report" />
          <CustomTable
            headers={[
              { key: "date", label: "Date" },
              { key: "employee_id", label: "Employee ID" },
              { key: "user_name", label: "Name" },
              {
                key: "user_phone",
                label: "Mobile Number",
              },
              { key: "role", label: "Role" },
              { key: "supervisor", label: "Supervisor" },
              { key: "in_time", label: "In Time" },
              { key: "in_location", label: "In Location" },
              { key: "out_time", label: "Out Time" },
              { key: "out_location", label: "Out Location" },

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

export default AuthCheck(AttendanceReport);
