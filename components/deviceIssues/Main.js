import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import AddDeviceIssue from "./AddDeviceIssue";
import { useDeleteDeviceIssueMutation } from "../../redux/features/deviceIssue/issueApi";

const DeviceIssuesManage = ({ values }) => {
  const router = useRouter();
  const [editData, setEditData] = useState(null);
  const [deleteDeviceIssue] = useDeleteDeviceIssueMutation();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Device Issue will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2dbdb6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDeviceIssue({ id: id });
      }
    });
  };



  const handleEdit = (data) => {
    console.log('edited data', data)
    setEditData(data);
  }

  console.log('values', values)

  return (
    <div>
      <div className="mt-5 block overflow-auto">
        <table className="table-auto w-full text-center text-[16px] overflow-x-auto">
          <thead>
            <tr>
              <th className="border whitespace-nowrap p-3">Name</th>
              <th className="border whitespace-nowrap p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {values?.data?.map((data, index) => (
              <tr
                key={index}
                className={`hover:bg-[#aeb4c0] ${index % 2 === 0 ? "bg-[#F7F8FA]" : ""
                  }`}
              >
                <td className="border whitespace-nowrap p-3 h-[55px]">
                  {data?.label}
                </td>
                <td className="border whitespace-nowrap p-3 h-[55px]">
                  <div className="flex justify-center gap-3">

                    <p className="cursor-pointer">
                      <TbEdit
                        size={20}
                        onClick={() => handleEdit(data)}
                      />
                    </p>

                    <p className="cursor-pointer">
                      <AiFillDelete
                        size={20}
                        onClick={() => handleDelete(data?.value)}
                      />
                    </p>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      { editData && (
        <AddDeviceIssue
          deviceIssueData={editData}
          setEditData={setEditData}
        />
      )}

    </div>
  );
};

export default DeviceIssuesManage;
