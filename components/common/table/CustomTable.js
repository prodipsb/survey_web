/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";

const CustomTable = ({
  headers,
  data,
  click,
  settings,
  viewData,
  editData,
  deleteData,
  assignRole,
}) => {
  return (
    <div className="mt-5 block overflow-auto">
      <table className="table-auto w-full text-left text-[13px] overflow-x-auto">
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th
                className="border whitespace-nowrap p-3 font-normal"
                key={index}
              >
                {header?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((tableData, index) => (
            <tr
              key={index}
              className={`hover:bg-[#aeb4c0] ${
                index % 2 === 0 ? "bg-[#F7F8FA]" : ""
              }`}
            >
              {headers?.map((header, index) => (
                <td
                  className="border whitespace-nowrap p-3 h-[55px]"
                  key={index}
                >
                  {header?.nested?.name ? (
                    <div className="relative">
                      {tableData[header?.nested?.avatar] && (
                        <img
                          className="rounded-[50%] h-[40px] w-[40px] absolute top-[-10px]"
                          src={`${process.env.NEXT_PUBLIC_IMAGE}${
                            tableData[header?.nested?.avatar]
                          }`}
                          alt=""
                        />
                      )}
                      <p className="ml-[55px]">
                        {tableData[header?.nested?.name]}
                      </p>
                    </div>
                  ) : (
                    <>
                      {tableData[header?.nested]
                        ? tableData[header?.key] &&
                          tableData[header?.key][header?.nested] &&
                          tableData[header?.key][header?.nested]
                        : tableData[header?.key]}
                    </>
                  )}
                  {header?.key === "action" && (
                    <div className="flex items-center gap-3">
                      {settings && (
                        <p className="cursor-pointer">
                          <VscSettings
                            size={20}
                            onClick={() => click("settings", tableData)}
                          />
                        </p>
                      )}
                      {viewData && (
                        <p className="cursor-pointer">
                          <AiFillEye
                            size={20}
                            onClick={() => click("view", tableData)}
                          />
                        </p>
                      )}
                      {editData && (
                        <p className="cursor-pointer">
                          <TbEdit
                            size={20}
                            onClick={() => click("edit", tableData)}
                          />
                        </p>
                      )}
                      {deleteData && (
                        <p className="cursor-pointer">
                          <AiFillDelete
                            size={20}
                            onClick={() => click("delete", tableData)}
                          />
                        </p>
                      )}
                      {assignRole && (
                        <p className="cursor-pointer">
                          <FaUserSecret
                            size={20}
                            onClick={() => click("role", tableData)}
                          />
                        </p>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
