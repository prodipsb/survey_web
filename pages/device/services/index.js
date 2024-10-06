import React, { useRef, useState } from "react";
import AuthCheck from "../../../components/authCheck/AuthCheck";
import CustomTable from "../../../components/common/table/CustomTable";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import { useDeletePushNotificationMutation, useGetAllPushNotificationQuery } from "../../../redux/features/pushNotification/pushNotificationApi";
import ViewPushNotification from "../../../components/viewPushNotification/Main";
import { useGetDeviceServicesQuery } from "../../../redux/features/deviceService/deviceServiceApi";
import ViewService from "./view";



const DeviceService = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const { data } = useGetAllNotificationQuery({ page: page, search: search });
  // const { data } = useGetAllPushNotificationQuery({ page: page, search: search });
  const { data } = useGetDeviceServicesQuery({ page: page, search: search });
  const [deviceService, setDeviceService] = useState(null);
  const [deletePushNotification] = useDeletePushNotificationMutation();

  // Get the router object
  const router = useRouter();

  const inputRef = useRef();

  const handleClick = (name, data) => {
    if (name === "view") {
      setDeviceService(data);
    }

    if (name === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "Data will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2dbdb6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          deletePushNotification({ id: data?.id });
        }
      });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleButtonClick = () => {
    // Use the push method to navigate to a new page
    router.push('/notification/send-push-notification');
  };

  console.log('deviceServices', data)


  return (
    <>
      {deviceService ? (
        <ViewService
          deviceService={deviceService}
          setDeviceService={setDeviceService}
        />
      ) : (
        <div className="w-[95%] mx-auto">
          <h1 className="font-bold text-[#646C9A] text-[24px] text-center mt-5 mb-5">
            Device Services
          </h1>
          <div className="flex justify-between flex-wrap gap-y-2">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder=" name"
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

            {/* <button
              onClick={handleButtonClick}
              className="py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            >
              Send Push Notification
            </button> */}
          </div>
          
          <CustomTable
            headers={[
              { key: "date", label: "Date" },
              { key: "user", label: "Sender"},
              { key: "binNumber", label: "BIN Number"},
              { key: "serialNumber", label: "Serial Number"},
              { key: "outletName", label: "Outlet Name" },
              { key: "status", label: "Status" },

              { key: "action", label: "Action" },
            ]}
            data={data?.data}
            viewData={true}
            deleteData={true}
            click={handleClick}
          />
          <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
            <p className="text-[#646C9A]">
              Total Services: {data?.meta?.total}
            </p>
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

export default AuthCheck(DeviceService);
