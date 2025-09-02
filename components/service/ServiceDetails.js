import moment from "moment/moment";
import React from "react";

const ServiceDetails = ({ deviceService, setDeviceService }) => {

    return (
        <div className="mt-5 w-[90%] lg:w-[60%] md:w-[60%] mx-auto text-[13px] border-b-blue-300 pb-5">
            <div className="flex flex-col items-center mb-5">
                <p className="font-bold text-[#646C9A] text-[24px] text-center w-full">
                    Service Details
                </p>
            </div>

            <table className="table-auto w-full text-left text-[14px] overflow-x-auto">
                <tr className="hover:bg-[#eff0f3] bg-[#F7F8FA]">
                    <td className="border whitespace-nowrap p-3 h-[55px]">Date</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.date}</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">BIN Number</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.binNumber}</td>
                </tr>
                <tr className="hover:bg-[#eff0f3] bg-[#F7F8FA]">
                    <td className="border whitespace-nowrap p-3 h-[55px]">Sender Name</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.user}</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">Device Serial Number</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.serialNumber}</td>
                </tr>
                <tr className="hover:bg-[#eff0f3] bg-[#F7F8FA]">
                    <td className="border whitespace-nowrap p-3 h-[55px]">Device</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.device}</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">Outlet Name</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.outletName}</td>
                </tr>
                <tr className="hover:bg-[#eff0f3] bg-[#F7F8FA]">
                    <td className="border whitespace-nowrap p-3 h-[55px]">Device Issue</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">
                        {deviceService.deviceIssues}
                    </td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">Outlet Address</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.outletAddress}</td>

                </tr>
                <tr className="hover:bg-[#eff0f3] bg-[#F7F8FA]">
                    <td className="border whitespace-nowrap p-3 h-[55px]">Additional Information</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.comment}</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">Status</td>
                    <td className="border whitespace-nowrap p-3 h-[55px]">{deviceService.status}</td>
                </tr>
            </table>

            {deviceService?.last_comment &&
                <div className="my-5 w-full">
                    <p className="my-2 text-[#646C9A]">Comment: {deviceService?.last_comment}</p>
                </div>
            }
            <div className="my-5 w-full">
                <p className="my-2 text-[#646C9A]">Status Updated: {deviceService.updatedAt}</p>
            </div>


            <table className="table-auto w-full text-left text-[14px] overflow-x-auto">
                {deviceService?.serviceCircle.map((serviceData, index) => (

                    <tr className="hover:bg-[#eff0f3] bg-[#F7F8FA]">
                        <td className="border whitespace-nowrap p-3 h-[55px]">Date</td>
                        <td className="border whitespace-nowrap p-3 h-[55px]">{ moment(serviceData.created_at).format('DD-MM-YYYY hh:mm A') }</td>
                        <td className="border whitespace-nowrap p-3 h-[55px]">Status</td>
                        <td className="border whitespace-nowrap p-3 h-[55px]">{serviceData.status}</td>
                        <td className="border whitespace-nowrap p-3 h-[55px]">Comment</td>
                        <td className="border whitespace-nowrap p-3 h-[55px]">{serviceData.comment}</td>
                    </tr>

                ))}

            </table>

            {deviceService?.serviceCircle?.length < 1 && 
                <h1>No Service Found!</h1>
            }


            <div className="flex justify-center mt-5">
                <button
                    type="button"
                    onClick={() => setDeviceService(null)}
                    className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
                >
                    Back
                </button>
            </div>

        </div>
    );
};

export default ServiceDetails;
