import React, { useEffect, useRef, useState } from "react";
import { useGetGeneralSettingQuery } from "../../../redux/features/generalSetting/generalSettingApi";
import toast from "react-hot-toast";
import AuthCheck from "../../../components/authCheck/AuthCheck";
import Multiselect from "multiselect-react-dropdown";
import { useCreatePushNotificationMutation, useGetDevicetokenQuery } from "../../../redux/features/pushNotification/pushNotificationApi";
import CommonDropDown from "../../../components/common/dropDown/CommonDropDown";
import { useGetRoleQuery } from "../../../redux/features/role/roleApi";
import { useUserProfileQuery } from "../../../redux/features/user/userApi";
// import SendPushNotification from "../../../components/common/pushNotification/SendPushNotification";
import sendPushNotification from "../../../components/common/pushNotification/PushNotificationHelper";
import { useRouter } from "next/router";

const PushNotification = () => {
  const { data, loading } = useGetDevicetokenQuery();
  const [selectedDeviceUsers, setSelectedDeviceUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [notificationType, setNotificationType] = useState({notificationType: 'Individual'});
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image:`${process.env.NEXT_PUBLIC_IMAGE}/assets/notification-bell.png`,
    content_available: true
  });


  const formRef = useRef();
  const router = useRouter();

  const { data: roleData } = useGetRoleQuery({
    pagination: 0,
  });

  const [createPushNotification, { isSuccess, isLoading:pushIsLoading }] = useCreatePushNotificationMutation();
  const { data:profileData } = useUserProfileQuery();

  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (notificationType?.notificationType == "Individual" && !selectedDeviceUsers.length > 0) {
      toast.error("Please select whom you want to send...");
    } 

    if (notificationType?.notificationType == "Role" && !roles.length > 0) {
      toast.error("Please select which role you want to send...");
    } 


      setIsloading(true);

      let deviceTokens = '';
       
      if(notificationType?.notificationType == "Individual"){

        deviceTokens = selectedDeviceUsers?.map((item) => item?.device_token);
        
      }else{

        const roleIds = roles?.map((role) => role?.id);
        const filteredUsers = data?.data?.filter(user => roleIds.includes(user.role_id));
        deviceTokens = filteredUsers?.map(user => user?.device_token);

      }

      if(selectedDeviceUsers){
     

      const storeData = {
        notificationType: notificationType?.notificationType,
        deviceTokens: selectedDeviceUsers,
        roles: roles,
        sender: {id: profileData?.data?.id, name: profileData?.data?.name, role_id: profileData?.data?.role_id, role: profileData?.data?.role?.name},
        notification: formData
      }


      // const storeData = {
      //   notificationType: notificationType?.notificationType,
      //   deviceTokens: selectedDeviceUsers,
      //   roles: roles,
      //   sender: {id: profileData?.data?.id, name: profileData?.data?.name, role_id: profileData?.data?.role_id, role: profileData?.data?.role?.name},
      //   notification: formData
      // }
      //  return false;


      try {

        const response = await fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          body: JSON.stringify({ registration_ids: deviceTokens, notification: formData, priority: "high" }),
          headers: {
            "Content-type": "application/json",
            "Authorization": `key=${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_SECRET_KEY}`
          },
        });
        const responseData = await response.json();
        if (!response.ok) {
          toast.error(responseData.message || "Something went wrong");
        } else {
          toast.success("Notification send successfully!");
          formRef.current.reset();
          setSelectedDeviceUsers([]);

          // store push notification on DB
          createPushNotification(storeData);
          router.push('/notification/push-notification')


        }
        setIsloading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setIsloading(false);
      }

    }else{
      toast.error('No Device Found!');
    }
    
  };

  const handlePersonSelectAll = (event) => {
    // Toggle selection status for "Select All"
    event?.target?.checked ? setSelectedDeviceUsers(data?.data) : setSelectedDeviceUsers([]);
  };

  const handleRoleSelectAll = (event) => {
    // Toggle selection status for "Select All"
    event?.target?.checked ? setRoles(roleData?.data?.data?.data) : setRoles([]);
  };

  return (
    <div className="mt-5 w-[90%] lg:w-[40%] md:w-[60%] mx-auto text-[13px] border-b-blue-300 pb-5">
      <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
        Push Notification
      </p>
      <form className="mb-5" onSubmit={handleSubmit} ref={formRef}>
        <div className="gap-10">

        <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">Notification Type</p>
            <CommonDropDown
                optionData={[{id: "Individual", name: "Individual"}, {id: "Role", name: "Role Wise"}]}
                defaultOptionValue={notificationType?.notificationType}
                defaultOptionLabel="name"
                defaultCreateText="Select type"
                setFormData={setNotificationType}
                required={true}
                name="notificationType"
              />
          </div>


          {notificationType.notificationType == 'Individual'&& (
          <div className="mb-5 w-full">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="mb-2 text-[#646C9A]">Person</p>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" onChange={handlePersonSelectAll} style={{ marginRight: '4px', marginBottom:'10px' }} />
                <p className="mb-2 text-[#646C9A]">All</p>
              </label>
            </div>
            <Multiselect
              options={data?.data}
              selectedValues={selectedDeviceUsers}
              onSelect={setSelectedDeviceUsers}
              onRemove={setSelectedDeviceUsers}
              // selectedValues={selectedOptions}
              // onSelect={handleSelect}
              // onRemove={handleDeselect}
              displayValue="user"
              showCheckbox={true}
              style={{
                searchBox: {
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid #e2e5ec",
                },
              }}
              loading={loading}
            />
          </div>
          )}

        {notificationType.notificationType == 'Role'&& (
          <div className="mb-5 w-full">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="mb-2 text-[#646C9A]">Role</p>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" onChange={handleRoleSelectAll} style={{ marginRight: '4px', marginBottom:'10px' }} />
                <p className="mb-2 text-[#646C9A]">All</p>
              </label>
            </div>
            <Multiselect
              options={roleData?.data?.data?.data}
              selectedValues={roles}
              onSelect={setRoles}
              onRemove={setRoles}
              displayValue="name"
              showCheckbox={true}
              style={{
                searchBox: {
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid #e2e5ec",
                },
              }}
              loading={loading}
              isSelectAll={true}
            />
          </div>
           )}


          <div className="mb-5 w-full">
            <p className="mb-2 text-[#646C9A]">Title*</p>
            <input
              className={inputStyle}
              type="text"
              name="title"
              required
              placeholder="Example: message title"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full mb-5">
            <p className="mb-2 text-[#646C9A]">Body*</p>
            <textarea
              className={inputStyle}
              type="text"
              rows={5}
              name="body"
              placeholder="Example: message body"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthCheck(PushNotification);
