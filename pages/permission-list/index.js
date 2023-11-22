import React, { useRef, useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import { Pagination } from "@mui/material";
import CustomTable from "../../components/common/table/CustomTable";
import {
  useDeletePermissionMutation,
  useGetPermissionQuery,
} from "../../redux/features/pemission/permissionApi";
import PermissionAddModal from "../../components/permissionAddModal/Main";
import Swal from "sweetalert2";

const PermissionList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const inputRef = useRef();

  const { data } = useGetPermissionQuery({
    page: page,
    search: search,
    pagination: 1,
  });
  const [deletePermission] = useDeletePermissionMutation();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (name, data) => {
    if (name === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "Permission will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2dbdb6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          deletePermission({ id: data?.id });
          setPage(1);
        }
      });
    }
  };

  return (
    <div>
      <div className="w-[95%] mx-auto">
        <h1 className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
          Permission List
        </h1>
        <div className="flex justify-between flex-wrap gap-y-2">
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
          <button
            onClick={() => setShowPopup(true)}
            className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            + Create new
          </button>
        </div>
        <CustomTable
          headers={[
            { key: "name", label: "Permission Name" },
            { key: "action", label: "Action" },
          ]}
          data={data?.data?.data?.data}
          deleteData={true}
          click={handleClick}
        />
        <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
          <Pagination
            count={data?.data?.data?.last_page}
            page={page}
            shape={"rounded"}
            onChange={handleChange}
          />
        </div>
      </div>
      {showPopup && <PermissionAddModal setShowPopup={setShowPopup} />}
    </div>
  );
};
export default AuthCheck(PermissionList);
