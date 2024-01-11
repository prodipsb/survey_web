/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import CommonDropDown from "../common/dropDown/CommonDropDown";
import { useGetRoleQuery, useGetUpperRolesQuery, useGetUserWithRoleQuery } from "../../redux/features/role/roleApi";
import { useCreateUserMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import Image from "next/image";
import cities from '../../utils/cities.json';
import divisions from '../../utils/divisions.json';
import moment from "moment";


const UpdateUser = ({ userEdit, setUserEdit }) => {
  const { data } = useGetRoleQuery({ pagination: 0 });
  const [createUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation();



    const [mobileNumber, setMobileNumber] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(false);
    const [supervisorUsers, setSupervisorUsers] = useState([]);
    const [upperRoles, setUpperRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(0);
    const [selectedSupervisorRole, setSelectedSupervisorRole] = useState(0);


    const { data: roleData, error: roleError, isLoading: roleIsLoading, refetch: refetchRoles  } = useGetUpperRolesQuery(selectedRole);


    const { data: roleUsers, error: roleUsersError, isLoading: roleUsersIsLoading, refetch: refetchRoleUsers  } = useGetUserWithRoleQuery(selectedSupervisorRole);


  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  const handleInputChange = (e) => {
    setUserEdit({
      ...userEdit,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('gggg', userEdit)

    const formdata = new FormData();
    Object.keys(userEdit).forEach((key) => {
      const value = userEdit[key];
      formdata.append(key, value);
    });
    createUser(formdata);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Data successfully updated!");
      setUserEdit(null);
    }

    if (isError) {
      toast.error("Something went wrong...");
    }
  }, [isSuccess, isError]);



  useEffect(() => {
    const roles = roleData?.data ? roleData?.data : data?.data?.data?.data;
    setUpperRoles(roles);
    console.log('Fetched data 12:',  data?.data?.data?.data);
    console.log('Fetched data 11:', roles);
  }, []);

  useEffect(() => {
    // Additional logic with the fetched data
    setUpperRoles(roleData?.data);
    console.log('Fetched data:', roleData?.data);
  }, [roleData]);

  useEffect(() => {

   
    // Additional logic with the fetched data
    console.log('Fetched roleUsers:', roleUsers);
    setSupervisorUsers(roleUsers?.data);
  }, [roleUsers]);


  const handleMobileNumberChange = (e) => {

    setPhoneValid(true);
    const value = e.target.value;

    // Allow only numeric input
    const numericValue = value.replace(/\D/g, '');

    // Restrict length to 11 digits
    const truncatedValue = numericValue.slice(0, 11);

    setMobileNumber(truncatedValue);

    // Validate mobile number format
    const isValidFormat = /^01\d{9}$/.test(truncatedValue);
    setIsValid(isValidFormat);

    setUserEdit({
      ...userEdit,
      [e.target.name]: truncatedValue,
    });
  };


  const updateState = async (id, name) => {
    try {
      if(name == 'role_id'){
        setSelectedRole(id);
        await refetchRoles(id);
      }

      if(name == 'supervisor_id'){
        const payload = {
          id: id,
          pagination: 0
        }
        setSelectedSupervisorRole(payload);
        await refetchRoleUsers(id);
      }

      if(name == 'reporting_role_id'){
        const payload = {
          id: id,
          pagination: 0
        }
        setSelectedSupervisorRole(payload);
        await refetchRoleUsers(id);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div>
      <div className="mt-5 w-[90%] mx-auto text-[13px] border-b-blue-300 pb-5">
        {userEdit?.avatar && (
          <Image
            src={
              typeof userEdit?.avatar === "string"
                ? `${process.env.NEXT_PUBLIC_IMAGE + userEdit?.avatar}`
                : URL.createObjectURL(userEdit?.avatar)
            }
            alt=""
            height={150}
            width={150}
            className="border rounded-full mx-auto shadow-md"
          />
        )}
        <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
          User Data
        </p>
        <form className="mb-5" onSubmit={handleSubmit}>
          <div className="md:flex lg:flex gap-10">
          <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">Employee ID*</p>
              <input
                className={inputStyle}
                type="text" 
                name="employee_id"
                value={userEdit?.employee_id}
                required
                placeholder="Example: 100001"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">User Name*</p>
              <input
                className={inputStyle}
                type="text"
                name="name"
                value={userEdit?.name}
                required
                placeholder="Example: John Doe"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">User Email*</p>
              <input
                className={inputStyle}
                type="email"
                name="email"
                readOnly
                value={userEdit?.email}
                required
                placeholder="Example: user@gmail.com"
                onChange={handleInputChange}
              />
            </div>
      
          </div>
          <div className="md:flex lg:flex gap-10">
          <div className="mb-5 w-full">
          <p className="mb-2 text-[#646C9A]"> Mobile Number*</p>
            <input
              className={inputStyle}
              type="text"
              id="mobileNumber"
              name="phone"
              value={userEdit?.phone}
              required
              placeholder="Example: 01XXXXXXXXX"
              onChange={handleMobileNumberChange}
            />
          

            { phoneValid && isValid && (
              <p style={{ color: 'green' }}>Valid mobile number format</p>
            )}

            {!isValid && (
               <p style={{ color: 'red' }}>Invalid mobile number format</p>
            )}
          </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">Gender*</p>
              <select
                className={inputStyle}
                value={userEdit?.gender}
                required
                name="gender"
                onChange={handleInputChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Join Date*</p>
              <input
                className={inputStyle}
                type="date"
                name="date_of_joining"
                value={moment(userEdit?.date_of_joining).format('YYYY-MM-DD')}
                onChange={handleInputChange}
              />
            </div>
           
           
          </div>
          <div className="md:flex lg:flex gap-10">

          <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Select Role*</p>
              <CommonDropDown
                optionData={data?.data?.data?.data}
                defaultOptionValue={userEdit?.role_id}
                defaultOptionLabel="name"
                defaultCreateText="Select a Role"
                setFormData={setUserEdit}
                updateState = {updateState}
                required={true}
                name="role_id"
              />
            </div>

            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Supervisor</p>
              <CommonDropDown
                optionData={upperRoles}
                defaultOptionValue={userEdit?.supervisor_id}
                defaultOptionLabel="name"
                defaultCreateText="Select supervisor"
                setFormData={setUserEdit}
                updateState = {updateState}
                required={false}
                name="supervisor_id"
              />
            </div>

            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Select Supervisor User</p>
              <CommonDropDown
                optionData={supervisorUsers}
                defaultOptionValue={userEdit?.supervisor_user_id}
                defaultOptionLabel="name"
                defaultCreateText="Select supervisor"
                setFormData={setUserEdit}
                required={false}
                name="supervisor_user_id"
              />
            </div>


          </div>
          <div className="md:flex lg:flex gap-10">

          <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User Location*</p>
              <input
                className={inputStyle}
                type="text"
                name="location"
                value={userEdit?.location}
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              />
            </div>

          <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Reporting To</p>
              <CommonDropDown
                optionData={upperRoles}
                defaultOptionValue={userEdit?.reporting_role_id}
                defaultOptionLabel="name"
                defaultCreateText="Select reporting person"
                setFormData={setUserEdit}
                updateState = {updateState}
                required={false}
                name="reporting_role_id"
              />
            </div>

            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Reporting Users</p>
              <CommonDropDown
                optionData={supervisorUsers}
                defaultOptionValue={userEdit?.reporting_user_id}
                defaultOptionLabel="name"
                defaultCreateText="Select reporting person"
                setFormData={setUserEdit}
                required={false}
                name="reporting_user_id"
              />
            </div>

           
          </div>
          {console.log('userEdit', userEdit)}
          <div className="md:flex lg:flex gap-10">


          <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User City*</p>
              <CommonDropDown
                optionData={cities}
                defaultOptionValue={userEdit?.city}
                defaultOptionLabel="name"
                defaultCreateText="Select City"
                setFormData={setUserEdit}
                required={true}
                name="city"
              />
              {/* <input
                className={inputStyle}
                type="text"
                name="city"
                value={userEdit?.city}
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              /> */}
            </div>
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User Division*</p>
              <CommonDropDown
                optionData={divisions}
                defaultOptionValue={userEdit?.division}
                defaultOptionLabel="name"
                defaultCreateText="Select Division"
                setFormData={setUserEdit}
                required={true}
                name="division"
              />
              {/* <input
                className={inputStyle}
                type="text"
                name="division"
                value={userEdit?.division}
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              /> */}
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">User Status</p>
              <select
                className={inputStyle}
                name="status"
                value={userEdit?.status}
                onChange={handleInputChange}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

           
           
           
          
          </div>

          <div className="md:flex lg:flex gap-10">

          <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User Bio</p>
              <textarea
                className={inputStyle}
                type="text"
                rows={1}
                value={userEdit?.bio}
                name="bio"
                placeholder="Example: user information"
                onChange={handleInputChange}
              />
            </div>

        
           

          <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">User Avatar</p>
              <input
                className="relative bg-white m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding py-2 px-3 text-base font-normal text-[#AFABC3] transition duration-300 ease-in-out file:-mx-3 file:-my-2 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-primary focus:border-blue-300"
                type="file"
                name="avatar"
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full mb-5"></div>

          </div>
          <div className="flex justify-center gap-3 mt-5">
            <button
              disabled={isLoading}
              type="buton"
              onClick={() => setUserEdit(null)}
              className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-white border-blue-500 border px-8 py-2 rounded-md text-black hover:bg-blue-500 hover:text-white"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateUser;
