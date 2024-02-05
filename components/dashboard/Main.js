import React from "react";
import DashboardBody from "./DashboardBody";
import DashboardHeader from "./DashboardHeader";
import { useGetdashboardQuery } from "../../redux/features/dashboard/dashboardApi";

function Main() {
  const { data } = useGetdashboardQuery();

    console.log('stats', data)
  return (
    <div>
      {data?.data?.userStats?.length > 0 && (
        <DashboardHeader userStats={data?.data?.userStats}/>
      )}
      <div className="lg:w-[95%] 2xl:w-[90%] mx-auto md:w-[90%] mt-20 flex md:flex-col lg:flex-row flex-col gap-10">
        <div className="w-[100%]">
          <DashboardBody
            dashboardItems={data?.data?.stats}
          />
        </div>
      </div>
    </div>
  );
}
export default Main;
