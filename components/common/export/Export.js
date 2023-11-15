import React, { useRef, useState } from "react";

const Export = ({ setSearch }) => {
  const formRef = useRef();
  const [searchValue, setSearchvalue] = useState({
    search: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    setSearchvalue({
      ...searchValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchValue);
    formRef.current.reset();
  };

  return (
    <form
      className="flex flex-wrap justify-between w-full"
      onSubmit={handleSubmit}
      ref={formRef}
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
            required={search?.end_date !== ""}
            className="px-5 py-2 rounded-md placeholder:text-[12px] outline-none w-full md:w-auto lg:w-auto"
          />
        </div>
        <div>
          <p className="mb-2 text-[#646C9A]">End Date</p>
          <input
            type="date"
            name="end_date"
            required={search?.start_date !== ""}
            onChange={handleChange}
            className="px-5 py-2 rounded-md placeholder:text-[12px] outline-none w-full md:w-auto lg:w-auto"
          />
        </div>
        <div className="flex items-end gap-3">
          <button
            type="submit"
            className="py-2.5  px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Search
          </button>
          <button
            type="submit"
            className="py-2.5 block lg:hidden md:hidden px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Export
          </button>
        </div>
      </div>
      <div className="items-end lg:flex md:flex hidden">
        <button
          type="submit"
          className="py-2.5  px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
        >
          Export
        </button>
      </div>
    </form>
  );
};

export default Export;
