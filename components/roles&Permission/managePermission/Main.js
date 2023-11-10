import React, { useState } from "react";
import CustomTable from "../../common/table/CustomTable";
import { FaUniversalAccess } from "react-icons/fa";
import { role } from "../../../static-data/roleData";
import PermissionForm from "./PermissionForm";
import Swal from "sweetalert2";

function Main() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClick = (name, data) => {
    if (name === "edit") {
      setFormData(data);
      setShowPopup(true);
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Entree will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2dbdb6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      });
    }
  };
  console.log(formData);

  return (
    <>
      <div className="w-[95%] mx-auto bg-white rounded-lg drop-shadow-md pb-10 mb-8 mt-7">
        <div className="h-[60px] mb-5 flex items-center text-[18px] font-bold text-[#515365] border-b-[1px] border-[#ebedf2]">
          <FaUniversalAccess className="mr-1 ml-[3%]" />
          Manage Permission
        </div>
        <div className="w-[95%] mx-auto">
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-[#515365] text-white rounded-md text-[13px] drop-shadow-md"
              onClick={() => {
                setShowPopup(true);
                setFormData({
                  role: "",
                  guard: "",
                });
              }}
            >
              Add New
            </button>
          </div>
          <CustomTable
            headers={[
              { key: "id", label: "ID" },
              { key: "role", label: "Role Name" },
              { key: "guard", label: "Guard Name" },
              { key: "permission", label: "Permission" },
              { key: "action", label: "Action" },
            ]}
            data={role}
            editData={true}
            deleteData={true}
            click={handleClick}
          />
        </div>
      </div>
      <div
        className={` ${
          showPopup &&
          "bg-[rgba(0,0,0,0.5)] w-screen h-screen fixed top-0 left-0 z-40"
        }`}
      >
        {showPopup && (
          <PermissionForm
            setShowPopup={setShowPopup}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </>
  );
}
export default Main;
