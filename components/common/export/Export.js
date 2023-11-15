import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Export = ({ setSearch, expUrl }) => {
  const [searchValue, setSearchvalue] = useState({
    search: "",
    start_date: "",
    end_date: "",
  });
  const [isSearch, setIsSearch] = useState(false);
  const token = useSelector((state) => state?.loginInfo?.access_token);
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
      `${expUrl}?${
        searchValue?.search ? "search=" + searchValue?.search + "&&" : ""
      }${
        searchValue?.start_date && searchValue?.end_date
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

  return (
    <form
      className="flex flex-wrap justify-between w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap gap-3">
        <div>
          <p className="mb-2 text-[#646C9A]">Enter Search Value</p>
          <input
            type="text"
            name="search"
            onChange={handleChange}
            placeholder="Accept name, email, user type"
            className="px-5 py-2 rounded-md placeholder:text-[12px] placeholder:text-black outline-none w-full md:w-auto lg:w-auto"
          />
        </div>
        <div>
          <p className="mb-2 text-[#646C9A]">Start Date</p>
          <input
            type="date"
            name="start_date"
            onChange={handleChange}
            required={searchValue?.end_date !== ""}
            className="px-5 py-2 rounded-md placeholder:text-[12px] outline-none w-full md:w-auto lg:w-auto"
          />
        </div>
        <div>
          <p className="mb-2 text-[#646C9A]">End Date</p>
          <input
            type="date"
            name="end_date"
            required={searchValue?.start_date !== ""}
            onChange={handleChange}
            className="px-5 py-2 rounded-md placeholder:text-[12px] outline-none w-full md:w-auto lg:w-auto"
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
          <button
            type="submit"
            onClick={() => setIsSearch(false)}
            className="py-2.5 block lg:hidden md:hidden px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Export
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
  );
};

export default Export;
