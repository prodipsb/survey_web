import React, { useEffect, useRef, useState } from "react";
import CommonDropDown from "../common/dropDown/CommonDropDown";
import { useGetRoleQuery, useGetUpperRolesQuery, useGetUserWithRoleQuery } from "../../redux/features/role/roleApi";
import { useCreateUserMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import countries from '../../utils/countries.json';
import commissionerate from '../../utils/commissionerate.json';
import cities from '../../utils/cities.json';
import zones from '../../utils/zones.json';
import {circleData, subdivision} from '../../utils/divisionCircle';
import Link from "next/link";
import { useRouter } from "next/router";


const Main = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    role_id: null,
    supervisor_id: null,
    supervisor_user_id: null,
    avatar: null,
    gender: "",
    bio: "",
    date_of_joining: "",
    country: "",
    zone: "",
    commissionerate: "",
    division: "",
    circle: "",
    address: "",
    longitude:"",
    latitude:"",
    status: "",
  });
  const [mobileNumber, setMobileNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [supervisorUsers, setSupervisorUsers] = useState([]);
  const [reportingUsers, setReportingUsers] = useState([]);
  const [upperRoles, setUpperRoles] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRole, setSelectedRole] = useState(0);
  const [selectedSupervisorRole, setSelectedSupervisorRole] = useState(0);

  const formRef = useRef();

  const { data } = useGetRoleQuery({ pagination: 0 });

  const { data: roleData, error: roleError, isLoading: roleIsLoading, refetch: refetchRoles  } = useGetUpperRolesQuery(selectedRole);
  // const { data: roleUsers, error: roleUsersError, isLoading: roleUsersIsLoading, refetch: roleUsersRefetch } = useLazyGetUserWithRoleQuery(selectedSupervisorRole)


  const { data: roleUsers, error: roleUsersError, isLoading: roleUsersIsLoading, refetch: refetchRoleUsers  } = useGetUserWithRoleQuery(selectedSupervisorRole);


  console.log('selectedSupervisorRole', selectedSupervisorRole)


  const [createUser, { isLoading, isError, isSuccess, error }] =
    useCreateUserMutation();

  const inputStyle =
    "border border-[#e2e5ec] outline-none focus:border-blue-300 placeholder:text-[#AFABC3] text-sm text-black rounded-md w-full p-2.5 bg-white";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const convertedFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      convertedFormData.append(key, value);
    });
    createUser(convertedFormData);
    router.push('user-list')
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Data successfully stored!");
      formRef.current.reset();
      setFormData({
        employee_id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        role_id: null,
        supervisor_id: null,
        supervisor_user_id: null,
        avatar: null,
        gender: "",
        bio: "",
        date_of_joining: "",
        country: "",
        zone: "",
        commissionerate: '',
        division: "",
        circle: "",
        address: "",
        longitude:"",
        latitude:"",
        status: "",
      });
    }

    if (isError) {
      toast.error("Something went wrong...");
    }
  }, [isSuccess, isError]);

  

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

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };


  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  
  // const { data } = useGetUpperRolesQuery(2);
  //     console.log('hello test', data);

  const updateState = async (id, name) => {
    // console.log('aaa' ,id)
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
        console.log('setSelectedSupervisorRole', payload)
        setSelectedSupervisorRole(payload);
        await refetchRoleUsers(id);
      }

      // if(name == 'reporting_role_id'){
      //   const payload = {
      //     id: id,
      //     pagination: 0
      //   }
      //   setSelectedSupervisorRole(payload);
      //   await refetchRoleUsers(id);
      // }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //  console.log('formData', formData)
  //  console.log('formData commissionerate', formData.commissionerate)
//  console.log('subdivision', subdivision[formData.commissionerate])

  return (
    <div>
      <div className="mt-5 w-[90%] mx-auto text-[13px] border-b-blue-300 pb-5">

      <div className="flex justify-between items-center">
        <p className="font-bold text-[#646C9A] text-[24px] mt-5 mb-5">
          User Creation
        </p>
        <div className="flex items-end">
          <Link
            href="/importUser"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Import 
          </Link>
        </div>
      </div>


        {/* <p className="font-bold text-[#646C9A] text-[24px] mt-5 mb-5">
          User Creation
        </p>
        <div className="items-end lg:flex md:flex hidden">
        <Link
          href="/importUser"
          className="py-2.5  px-5 mx-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
        >
          Import
        </Link>
        </div> */}

        <form className="mb-5" onSubmit={handleSubmit} ref={formRef}>
          <div className="md:flex lg:flex gap-10">

          <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">Employee ID*</p>
              <input
                className={inputStyle}
                type="text"
                name="employee_id"
                required
                placeholder="Example: 100001"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]"> Name*</p>
              <input
                className={inputStyle}
                type="text"
                name="name"
                required
                placeholder="Example: John Doe"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]"> Email*</p>
              <input
                className={inputStyle}
                type="email"
                name="email"
                required
                placeholder="Example: user@gmail.com"
                onChange={handleInputChange}
              />
              {error && (
                <p className="text-red-500 mt-1">
                  {error?.data?.message?.email?.[0] &&
                    error?.data?.message?.email?.[0]}
                </p>
              )}
            </div>


          </div>
          <div className="md:flex lg:flex gap-10">
          <div className="mb-5 w-full">
          <p className="mb-2 text-[#646C9A]"> Phone*</p>
            <input
              className={inputStyle}
              type="text"
              id="mobileNumber"
              name="phone"
              value={mobileNumber}
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
                required
                name="gender"
                onChange={handleInputChange}
              >
                <option value=""> Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="mb-5 w-full relative">
              <p className="mb-2 text-[#646C9A]"> Password*</p>
              <input
                className={inputStyle}
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="User password"
                onBlur={handleInputChange}
              />
              {showPassword ? (
                <IoIosEyeOff
                  size={20}
                  className="absolute right-3 top-10"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoMdEye
                  size={20}
                  className="absolute right-3 top-10"
                  onClick={() => setShowPassword(true)}
                />
              )}
              {error && (
                <p className="text-red-500 mt-1">
                  {error?.data?.message?.password[0] &&
                    error?.data?.message?.password[0]}
                </p>
              )}
            </div>

          </div>
          <div className="md:flex lg:flex gap-10">

          <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Role*</p>

              {/* <select
                className={inputStyle}
                required
                name="role_id"
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                {data?.data?.data?.data.map((option, i) => (
                  <option key={i} value={option.id}>
                    {option.name}
                  </option>
                ))}
              
              </select> */}


              <CommonDropDown
                optionData={data?.data?.data?.data}
                defaultOptionValue={formData?.role_id}
                defaultOptionLabel="name"
                defaultCreateText="Select a Role"
                setFormData={setFormData}
               // onChange={handleUserRole}
                updateState = {updateState}
                required={true}
                name="role_id"
              />


            </div>

          {/* <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">User Role*</p>
              <CommonDropDown
                optionData={data?.data?.data?.data}
                defaultOptionValue={formData?.role_id}
                defaultOptionLabel="name"
                defaultCreateText="Select a Role"
                // setFormData={setFormData}
                onChange={handleUserRole}
                required={true}
                name="role_id"
              />
            </div> */}
            
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Supervisor</p>
              <CommonDropDown
                optionData={upperRoles}
                defaultOptionValue={formData?.supervisor_id}
                defaultOptionLabel="name"
                defaultCreateText="Select supervisor"
                updateState = {updateState}
                setFormData={setFormData}
                required={false}
                name="supervisor_id"
              />
            </div>
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Supervisor Name</p>
              <CommonDropDown
                optionData={supervisorUsers}
                defaultOptionValue={formData?.supervisor_user_id}
                defaultOptionLabel="name"
                defaultCreateText="Select supervisor person"
                setFormData={setFormData}
                required={false}
                name="supervisor_user_id"
              />
            </div>

          </div>


          <div className="md:flex lg:flex gap-10">
          <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Country*</p>

              <CommonDropDown
                optionData={countries}
                defaultOptionValue={formData?.country}
                defaultOptionLabel="name"
                defaultCreateText="Select Country"
                setFormData={setFormData}
                required={true}
                name="country"
              />
              {selectedCity && <p style={{ color: 'green' }}>You selected: {selectedCity}</p>}

            </div>

            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Zone*</p>

              <CommonDropDown
                optionData={zones}
                defaultOptionValue={formData?.zone}
                defaultOptionLabel="name"
                defaultCreateText="Select Zone"
                setFormData={setFormData}
                required={true}
                name="zone"
              />
              {selectedCity && <p style={{ color: 'green' }}>You selected: {selectedCity}</p>}

            </div>

            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Commissionerate*</p>

              <CommonDropDown
                optionData={commissionerate}
                defaultOptionValue={formData?.commissionerate}
                defaultOptionLabel="name"
                defaultCreateText="Select Commissionerate"
                setFormData={setFormData}
                required={true}
                name="commissionerate"
              />
              {selectedCity && <p style={{ color: 'green' }}>You selected: {selectedCity}</p>}

            </div>

   
          </div>

          
          <div className="md:flex lg:flex gap-10">
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Division*</p>
              <CommonDropDown
                optionData={subdivision[formData.commissionerate]}
                defaultOptionValue={formData?.division}
                defaultOptionLabel="name"
                defaultCreateText="Select Division"
                setFormData={setFormData}
                required={true}
                name="division"
              />
              {/* <input
                className={inputStyle}
                type="text"
                name="division"
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              /> */}
            </div>

            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Circle*</p>
              <CommonDropDown
                optionData={circleData[formData?.division]}
                defaultOptionValue={formData?.circle}
                defaultOptionLabel="name"
                defaultCreateText="Select Circle"
                setFormData={setFormData}
                required={true}
                name="circle"
              />
              {/* <input
                className={inputStyle}
                type="text"
                name="division"
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              /> */}
            </div>

            {/* <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Circle*</p>
              <input
                className={inputStyle}
                type="text"
                name="location"
                required
                placeholder="Example: Dhaka"
                onChange={handleInputChange}
              />
            </div> */}
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Address</p>
              <textarea
                className={inputStyle}
                type="text"
                rows={1}
                name="address"
                placeholder="Example: user address"
                onChange={handleInputChange}
              />
            </div>
            
          </div>
          <div className="md:flex lg:flex gap-10">
          <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]"> Status*</p>
              <select
                className={inputStyle}
                required
                name="status"
                onChange={handleInputChange}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]">Date of Joining*</p>
              <input
                className={inputStyle}
                type="date"
                name="date_of_joining"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full mb-5">
              <p className="mb-2 text-[#646C9A]"> Bio</p>
              <textarea
                className={inputStyle}
                type="text"
                rows={1}
                name="bio"
                placeholder="Example: user bio"
                onChange={handleInputChange}
              />
            </div>

          </div>
          <div className="md:flex lg:flex gap-10">
          <div className="mb-5 w-full">
              <p className="mb-2 text-[#646C9A]">Avatar</p>
              <input
                className="relative bg-white m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding py-2 px-3 text-base font-normal text-[#AFABC3] transition duration-300 ease-in-out file:-mx-3 file:-my-2 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-primary focus:border-blue-300"
                type="file"
                name="avatar"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-5 w-full"></div>
            <div className="mb-5 w-full"></div>
          </div>
          <div className="flex justify-center mt-5">
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

export default Main;
