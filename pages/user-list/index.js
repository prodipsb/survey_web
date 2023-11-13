import React, { useRef, useState } from "react";
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

const UserList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data } = useGetUserQuery({ page: page, search: search });
  const [userEdit, setUserEdit] = useState(null);
  const [userView, setUserView] = useState(null);
  const [deleteUser] = useDeleteUserMutation();

  const inputRef = useRef();

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
              { key: "role_id", label: "Role" },
              { key: "supervisor_id", label: "Supervisor" },
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
      )}
    </>
  );
};

export default AuthCheck(UserList);
