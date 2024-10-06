/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import AuthCheck from "../../components/authCheck/AuthCheck";
import CustomTable from "../../components/common/table/CustomTable";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import {
  useLazyGetUserWithRoleQuery,
  useUserRoleRemoveMutation,
} from "../../redux/features/role/roleApi";
import { useRouter } from "next/router";

const RoleUserlist = () => {
  const { query } = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const inputRef = useRef();

  const [triger, result] = useLazyGetUserWithRoleQuery();
  const [userRoleRemove] = useUserRoleRemoveMutation();

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (query?.id) {
      triger({
        page: page,
        search: search,
        id: query?.id,
      });
    }
  }, [page, query, search]);

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
          userRoleRemove({ user_id: data?.id });
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
        <CustomTable
          headers={[
            { key: "name", label: "User Name" },
            { key: "action", label: "Action" },
          ]}
          data={result?.data?.data?.data}
          deleteData={true}
          click={handleClick}
        />
        <div className="flex lg:justify-between md:justify-between lg:flex-row md:flex-row flex-col items-center gap-y-5 mt-5 pb-5">
          <p className="text-[#646C9A]">
            Total user: {result?.data?.data?.total}
          </p>
          <Pagination
            count={result?.data?.data?.last_page}
            page={page}
            shape={"rounded"}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
export default AuthCheck(RoleUserlist);
