import React from "react";
import DashboardBody from "./DashboardBody";
import DashboardHeader from "./DashboardHeader";
import { useGetdashboardQuery } from "../../redux/features/dashboard/dashboardApi";

function Main() {
  const { data } = useGetdashboardQuery();
  return (
    <div>
      <DashboardHeader userStats={data?.data?.userStats}/>
      <div className="lg:w-[95%] 2xl:w-[90%] mx-auto md:w-[90%] mt-10 flex md:flex-col lg:flex-row flex-col gap-10">
        <div className="w-[100%]">
          <DashboardBody
            dashboardItems={[
              {
                name: "Total Form Submission",
                count: data?.data?.totalMonthlySubmittedSurveyCount | 0,
              },
              {
                name: "Today Form Submission",
                count: data?.data?.totalTodaySubmittedSurveyCount | 0,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
export default Main;
