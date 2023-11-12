import React, { useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import { useGetUserQuery } from "../../redux/features/user/userApi";
import CustomTable from "../../components/common/table/CustomTable";
import { Pagination } from "@mui/material";

const UserList = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetUserQuery(page);

  const handleClick = (name, data) => {
    if (name === "view") {
      setViewDetails(data?.emp_id);
    }
    if (name === "edit") {
      push(`user-onboarding/employee-creation?id=${data?.emp_id}`);
    }
    if (name === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "Entree will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2dbdb6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          getDeleteApiCall(`employee/delete/${data?.emp_id}`);
        }
      });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="w-[95%] mx-auto">
      <h1 className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">Employee List</h1>
      <CustomTable
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
          { key: "role_id", label: "Role ID" },
          { key: "supervisor_id", label: "Supervisor ID" },
          { key: "reporting_role_id", label: "Reporting To" },
          { key: "user_type", label: "User Type" },
          { key: "action", label: "Action" },
        ]}
        data={data?.data?.data}
        viewData={true}
        editData={true}
        deleteData={true}
        click={handleClick}
      />
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

export default AuthCheck(UserList);
