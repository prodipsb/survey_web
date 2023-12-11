import React from "react";

function DashboardBody({ dashboardItems }) {
  return (
    <div className="grid 3xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-x-5 gap-y-2 ">
      {dashboardItems?.map((item, index) => (
        <div key={index}>
          <div className="mx-auto p-[30px] h-[300px] w-[250px] md:w-full lg:w-[85%] mb-3 text-[#782b90] hover:text-white bg-white rounded-lg drop-shadow-md hover:bg-[#2dbdb6] flex flex-col items-center justify-center flex-wrap gap-4">
            <p className="font-bold text-[24px]">{item?.count}</p>
            <p className="font-bold whitespace-nowrap">{item?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardBody;
