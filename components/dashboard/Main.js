import React from "react";
import { dashboardItems } from "./DasboardItems";
import DashboardBody from "./DashboardBody";
import DashboardHeader from "./DashboardHeader";

function Main() {
  return (
    <div>
      <DashboardHeader />
      <div className="lg:w-[95%] 2xl:w-[90%] mx-auto md:w-[90%] mt-10 flex md:flex-col lg:flex-row flex-col gap-10">
        <div className="w-[100%]">
          <DashboardBody dashboardItems={dashboardItems} />
        </div>
      </div>
    </div>
  );
}
export default Main;
