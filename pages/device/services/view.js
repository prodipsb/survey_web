import React, { useRef, useState } from "react";
import CommonDropDown from "../../../components/common/dropDown/CommonDropDown";
import { TbEdit } from "react-icons/tb";
import { useUpdateDeviceServiceMutation } from "../../../redux/features/deviceService/deviceServiceApi";
import toast from "react-hot-toast";
import sendPushNotification from "../../../components/common/pushNotification/PushNotificationHelper";

const ViewService = ({ deviceService, setDeviceService }) => {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [status, setStatus] = useState(null);
  const [comment, setComment] = useState(null);
  const [formData, setFormData] = useState({
    title: 'Device status notification',
    body: '',
    image:`${process.env.NEXT_PUBLIC_IMAGE}/assets/notification-bell.png`,
    content_available: true
  });

  const [updateDeviceService] = useUpdateDeviceServiceMutation();

  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  const handleInputChange = (e) => {

    setComment(e.target.value);

    setFormData({
      'body': e.target.value
    })


  };


  const handleEdit = () => {
    setShowInput(!showInput);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      'id': deviceService.id,
      'comment': comment,
      'status': status.status
    }

    updateDeviceService(data)

    setIsLoading(false);

    toast.success("Device Service updated successfully!");
    let tt = deviceService?.deviceToken;
    const deviceTokens = [tt]
    console.log('deviceTokens', deviceTokens)
    if(deviceTokens){

      console.log('deviceTokens formData',  formData)

      await sendPushNotification(deviceTokens, formData)

    }


    setDeviceService(null)

  };



  return (
    <div className="mt-5 w-[90%] lg:w-[40%] md:w-[60%] mx-auto text-[13px] border-b-blue-300 pb-5">
      <div className="flex flex-col items-center mb-5">
        <p className="font-bold text-[#646C9A] text-[24px] text-center w-full">
          Service Details
        </p>
        <div className="w-full flex justify-end text-[#646C9A] cursor-pointer">
          <TbEdit size={20} onClick={handleEdit} />
        </div>
      </div>

      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Date: {deviceService.date}</p>
      </div>
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Sender Name: {deviceService.user}</p>
      </div>
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">BIN Number: {deviceService.binNumber}</p>
      </div>
      
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Device Serial Number: {deviceService.serialNumber}</p>
      </div>
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Device: {deviceService.device}</p>
      </div>
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Outlet Name: {deviceService.outletName}</p>
      </div>
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Outlet Address: {deviceService.outletAddress}</p>
      </div>
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Additional Information: {deviceService.comment}</p>
      </div>
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Device Issue: {deviceService.deviceIssues.map((deviceIssue, index) => {
          return deviceIssue.issue.title + ',  '
        })}</p>
      </div>
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Status: {deviceService.status}</p>
      </div>
      {deviceService?.last_comment &&
        <div className="mb-5 w-full">
          <p className="mb-2 text-[#646C9A]">Comment: {deviceService?.last_comment}</p>
        </div>
      }
      <div className="mb-5 w-full">
        <p className="mb-2 text-[#646C9A]">Status Updated: {deviceService.updatedAt}</p>
      </div>


      {showInput && (
        <form className="mb-5" onSubmit={handleSubmit} ref={formRef}>
          <div className="gap-10">
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Comment</p>
              <textarea
                className={inputStyle}
                rows={5}
                name="body"
                placeholder="Example: comment body"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">Status</p>
              <CommonDropDown
                optionData={[
                  { id: "Received", name: "Pending" },
                  { id: "Received", name: "Received" },
                  { id: "Processing", name: "Processing" },
                  { id: "Realy For Delivered", name: "Realy For Delivered" },
                  { id: "AO Received", name: "AO Received" },
                  { id: "Delivered", name: "Delivered" },
                ]}
                defaultOptionValue={status}
                defaultOptionLabel="name"
                defaultCreateText="Select Status"
                setFormData={setStatus}
                required
                name="status"
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      )}

      {!showInput && (
        <div className="flex justify-center mt-5">
          <button
            type="button"
            onClick={() => setDeviceService(null)}
            className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
          >
            Back
          </button>
        </div>
      )}

    </div>
  );
};

export default ViewService;
