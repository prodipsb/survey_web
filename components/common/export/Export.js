import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";


const Export = ({ setSearch, expUrl, setVisible }) => {
  const [searchValue, setSearchvalue] = useState({
    employee_id: "",
    search: "",
    start_date: "",
    end_date: "",
  });
  const [isSearch, setIsSearch] = useState(false);
  const token = useSelector((state) => state?.loginInfo?.access_token);


  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white min-w-[252px]";


  const handleChange = (e) => {
    setSearchvalue({
      ...searchValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSearch) {
      setSearch(searchValue);
    } else {
      handleExport();
    }
  };

  const handleExport = () => {
    const url =
      process.env.NEXT_PUBLIC_API +
      `${expUrl}?${searchValue?.search ? "search=" + searchValue?.search + "&&" : ""
      }${searchValue?.start_date && searchValue?.end_date
        ? "start_date=" +
        searchValue?.start_date +
        "&&end_date=" +
        searchValue?.end_date +
        "&&"
        : ""
      }export=true`;

    downloadFile(url);
  };

  const downloadFile = (url) => {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    fetch(url, { headers })
      .then((response) => {
        if (!response.ok) {
          toast.error(`Failed to export file...`);
        }

        const contentDisposition = response.headers.get("content-disposition");
        if (
          contentDisposition &&
          contentDisposition.indexOf("filename=") !== -1
        ) {
          fileName = contentDisposition.split("filename=")[1];
        }

        return response.text();
      })
      .then((csvData) => {
        let fileName = "report.csv";
        const blob = new Blob([csvData], { type: "text/csv" });

        const link = document.createElement("a");
        const blobUrl = window.URL.createObjectURL(blob);

        link.href = blobUrl;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const showModal = () => {
    setVisible(true);
  };


  const updateState = async (id, name) => {
    // console
  };

  return (
    <div>
      <form
        className="flex flex-wrap justify-between w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap gap-3">

          <div>
            <p className="mb-2 text-[#646C9A] text-[14px]">Employee ID</p>
            <input
              className={inputStyle}
              type="text"
              name="employee_id"
              placeholder="Example: 100001"
              onChange={handleChange}
            />
          </div>

          <div>
            <p className="mb-2 text-[#646C9A] text-[14px]"> Search</p>
            <input
              className={inputStyle}
              type="text"
              name="search"
              placeholder="Enter Name, Phone"
              onChange={handleChange}
            />
          </div>


          <div>
              <p className="mb-2 text-[#646C9A] text-[14px]">Start Date</p>
              <input
                className={inputStyle}
                type="date"
                name="start_date"
                required={searchValue?.end_date !== ""}
                onChange={handleChange}
              />
            </div>

          <div>
            <p className="mb-2 text-[#646C9A] text-[14px]">End Date</p>
            <input
              type="date"
              name="end_date"
              required={searchValue?.start_date !== ""}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div className="flex items-end gap-3">
            <button
              type="submit"
              onClick={() => setIsSearch(true)}
              className="py-2.5  px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            >
              Search
            </button>
          
          </div>
        </div>
        <div className="items-end lg:flex md:flex hidden">
          <button
            type="submit"
            onClick={() => setIsSearch(false)}
            className="py-2.5  px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Export
          </button>
        </div>

      </form>

    </div>
  );
};

export default Export;
