import React, { useEffect, useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useStatusUserMutation,
  useUserProfileQuery,
} from "../../redux/features/user/userApi";
import CustomTable from "../../components/common/table/CustomTable";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import UpdateUser from "../../components/updateUser/Main";
import ViewUser from "../../components/viewUser/Main";
import Export from "../../components/common/export/Export";
import ImportUserModel from "../../components/ImportUserModal/Main";
import { useRouter } from 'next/router';

const UserList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const { data } = useGetUserQuery({ page: page, search: search });
  const { data:profileData } = useUserProfileQuery();
  
  const [userEdit, setUserEdit] = useState(null);
  const [userView, setUserView] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // const [showImport, setShowImport] = useState(false);
  
  const [userStatus] = useStatusUserMutation();

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
    if (name === "status") {
        userStatus({ id: data?.id });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };


  // permission?.includes(nav?.name?.toLowerCase())

  return (
    <>
      {userEdit ? (
        <UpdateUser userEdit={userEdit} setUserEdit={setUserEdit} />
      ) : userView ? (
        <ViewUser userView={userView} setUserView={setUserView} />
      ) : (
        <div className="w-[95%] mx-auto">
          <h1 className="font-bold text-[#646C9A] text-[24px] mt-5 mb-5">
            User List
          </h1>
          <Export setSearch={setSearch} expUrl="/users" setVisible={setVisible} />
          <CustomTable
            headers={[
              // { key: "id", label: "SI. No." },
              { key: "employee_id", label: "Employee ID" },
              {
                label: "Name",
                nested: {
                  name: "name",
                  avatar: "avatar",
                },
              },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "role", label: "Role", nested: "name" },
              { key: "supervisor_role", label: "Supervisor", nested: "name"},
              { key: "supervisor", label: "Supervisor Name", nested: "name" },
              { key: "gender", label: "Gender" },
              { key: "date_of_joining", label: "Date of Joining" },
              { key: "country", label: "Country" },
              { key: "zone", label: "Zone" },
              { key: "commissionerate", label: "Commissionerate" },
              { key: "division", label: "Division" },
              { key: "circle", label: "Circle" },
              { key: "address", label: "Address" },
              // { key: "last_login", label: "Last Login" },
              // { key: "last_logout", label: "Last Logout" },
              { key: "status", label: "Status" },
              
              { key: "action", label: "Action" },
            ]}
            data={data?.data?.data}
            viewData={true}
            editData={profileData?.data?.permissions?.includes('edit user') ?  true : false}
            statusData={true}
            click={handleClick}
          />
          <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
            <p className="text-[#646C9A]">Total user: {data?.data?.total}</p>
            <Pagination
              count={data?.data?.last_page}
              page={page}
              shape={"rounded"}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
       {visible && <ImportUserModel setShowPopup={setShowPopup} />}
    </>
  );
};

export default AuthCheck(UserList);
