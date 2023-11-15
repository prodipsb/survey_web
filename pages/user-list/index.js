import React, { useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../redux/features/user/userApi";
import CustomTable from "../../components/common/table/CustomTable";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import UpdateUser from "../../components/updateUser/Main";
import ViewUser from "../../components/viewUser/Main";
import Export from "../../components/common/export/Export";

const UserList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const { data } = useGetUserQuery({ page: page, search: search });
  const [userEdit, setUserEdit] = useState(null);
  const [userView, setUserView] = useState(null);
  const [deleteUser] = useDeleteUserMutation();

  const handleClick = (name, data) => {
    if (name === "view") {
      setUserView(data);
    }
    if (name === "edit") {
      setUserEdit(data);
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
          deleteUser({ id: data?.id });
        }
      });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {userEdit ? (
        <UpdateUser userEdit={userEdit} setUserEdit={setUserEdit} />
      ) : userView ? (
        <ViewUser userView={userView} setUserView={setUserView} />
      ) : (
        <div className="w-[95%] mx-auto">
          <h1 className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
            User List
          </h1>
          <Export setSearch={setSearch} />
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

export default AuthCheck(UserList);
