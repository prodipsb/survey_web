import React from "react";
import { MdManageAccounts } from "react-icons/md";
import { permission } from "../../../static-data/permissionData";
import CustomTable from "../../common/table/CustomTable";

function Main() {
  return (
    <div className="w-[95%] mx-auto bg-white rounded-lg drop-shadow-md pb-10 mb-8 mt-7">
      <div className="h-[60px] mb-5 flex items-center text-[18px] font-bold text-[#515365] border-b-[1px] border-[#ebedf2]">
        <MdManageAccounts className="mr-1 ml-[3%]" />
        Manage Role
      </div>
      <div className="w-[95%] mx-auto pt-2">
        <CustomTable
          headers={[
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "guard", label: "Guard" },
          ]}
          data={permission}
        />
      </div>
    </div>
  );
}
export default Main;
