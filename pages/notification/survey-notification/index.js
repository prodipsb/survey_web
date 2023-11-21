import React, { useRef, useState } from "react";
import AuthCheck from "../../../components/authCheck/AuthCheck";
import CustomTable from "../../../components/common/table/CustomTable";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";

import {
  useDeleteNotificationMutation,
  useGetAllNotificationQuery,
} from "../../../redux/features/notification/notificationApi";
import ViewNotification from "../../../components/viewNotification/Main";

const UserList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data } = useGetAllNotificationQuery({ page: page, search: search });
  const [viewUserNotification, setViewUserNotification] = useState(null);
  const [deleteNotification] = useDeleteNotificationMutation();

  const inputRef = useRef();

  const handleClick = (name, data) => {
    if (name === "view") {
      setViewUserNotification(data);
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
          deleteNotification({ id: data?.id });
        }
      });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {viewUserNotification ? (
        <ViewNotification
          viewUserNotification={viewUserNotification}
          setViewUserNotification={setViewUserNotification}
        />
      ) : (
        <div className="w-[95%] mx-auto">
          <h1 className="font-bold text-[#646C9A] text-[24px] text-center mt-5 mb-5">
            Notification List
          </h1>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Accept name"
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
              { key: "created_at", label: "DateTime" },
              { key: "submitted_user", label: "Name" },
              { key: "message", label: "Message" },
              { key: "read", label: "Read" },
              { key: "read_at", label: "Read At" },

              { key: "action", label: "Action" },
            ]}
            data={data?.data}
            viewData={true}
            deleteData={true}
            click={handleClick}
          />
          <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
            <Pagination
              count={data?.meta?.total}
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
