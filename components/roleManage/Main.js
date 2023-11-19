import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDeleteRoleMutation } from "../../redux/features/role/roleApi";
import SetRole from "./SetRole";
import { useRouter } from "next/router";
import SetPermission from "./SetPermission";

const RoleManage = ({ values }) => {
  const router = useRouter();
  const [roleData, setRoleData] = useState(null);
  const [permissionData, setPermisionData] = useState(null);
  const [deleteRole] = useDeleteRoleMutation();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Role will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2dbdb6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRole({ id: id });
      }
    });
  };

  const setRole = (data) => {
    setRoleData(data);
  };

  return (
    <div>
      <div className="mt-5 block overflow-auto">
        <table className="table-auto w-full text-center text-[16px] overflow-x-auto">
          <thead>
            <tr>
              <th className="border whitespace-nowrap p-3">Role</th>
              <th className="border whitespace-nowrap p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {values?.map((data, index) => (
              <tr
                key={index}
                className={`hover:bg-[#aeb4c0] ${
                  index % 2 === 0 ? "bg-[#F7F8FA]" : ""
                }`}
              >
                <td className="border whitespace-nowrap p-3 h-[55px]">
                  {data?.name}
                </td>
                <td className="border whitespace-nowrap p-3 h-[55px]">
                  <div className="flex justify-center gap-3">
                    <button
                      className="px-3 py-1 rounded-md bg-[#F5F5DC] shadow-md"
                      onClick={() => setRole(data)}
                    >
                      User Role Set
                    </button>
                    <button
                      onClick={() => router.push(`/role-user-list/${data?.id}`)}
                      className="px-3 py-1 rounded-md bg-[#E9967A] text-white shadow-md"
                    >
                      User List
                    </button>
                    <button
                      onClick={() => setPermisionData(data)}
                      className="px-3 py-1 rounded-md bg-[#F0FFFF] shadow-md"
                    >
                      Permission Set
                    </button>
                    <button
                      onClick={() => handleDelete(data?.id)}
                      className="border border-red-500 px-3 py-1 rounded-md bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {roleData && <SetRole setRoleData={setRoleData} roleData={roleData} />}
      {permissionData && (
        <SetPermission
          permissionData={permissionData}
          setPermisionData={setPermisionData}
        />
      )}
    </div>
  );
};

export default RoleManage;
