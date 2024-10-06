import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import { FaDownload } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useImportUserMutation } from "../../redux/features/user/userApi";
import { useRouter } from "next/router";
// import { postApiRequest } from "./api"; // Import your API request function

const ImportUser = ({ setShowPopup, history }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  const outsideClick = useRef();


  const [importUser, { isLoading: importDataLoading, isError, isSuccess, error }] = useImportUserMutation();

  const handleOutsideClick = (e) => {
    if (outsideClick.current && !outsideClick.current.contains(e.target)) {
      setShowPopup(false);
    }
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("upload_file", uploadFile);

    try {

      importUser(formData);
      toast.success('User Data Uploaded Successfully!');
      router.push("/user-list")
    } catch (error) {
      toast.error("An error occurred while uploading the file.");
    } finally {
      setIsLoading(false);
    }
  };

  const exportReport = () => {
    const url = process.env.NEXT_PUBLIC_IMAGE + `/assets/users/survey-user-demo-1.csv`;
    window.location.href = url;
  };

  console.log('uplod', uploadFile)

  return (
    <div className="mt-5 lg:w-[40%] w-[90%] md:w-[60%] mx-auto text-[13px] border-b-blue-300 pb-5">
      <p className="font-bold text-[#646C9A] text-[24px] text-center mt-5 mb-5">
        Import User
      </p>
      <div title="User File Upload">
      <ol>
        <li>
          Upload Hint:
          <ol>
            <li>Column Name: Employee ID, Name, Email, Phone, User Role, Supervisor, Supervisor Name, Gender, Bio, Date of Joining, Country, Zone, Commissionerate, Division, Circle, Address</li>
            <li>Employee ID, Name, Phone, User Role, Gender, Country, Commissionerate, Division, Circle those fields are required</li>
            <li>Phone should be unique</li>
            <li>User Role should be valid</li>
            <li>Supervisor should be valid and it will always be name</li>
            <li>status should add as active</li>
            <li>email: should be unique but optional</li>
            <li>name: any name</li>
            <li>Don't use a full stop after value</li>
          </ol>
        </li>
      </ol>
      <Button 
        startIcon={<FaDownload />} 
        onClick={exportReport} 
        style={{
          marginTop: 15,
          marginBottom: 15,
          border: '1px solid gray', // Add your desired border color and width
          borderRadius: '4px', // Add border radius for rounded corners
          padding: '6px 16px', // Add padding for spacing
          backgroundColor: '#fff', // Add background color
          color: '#000', // Add text color
          cursor: 'pointer', // Add cursor style
          ':hover': {
            backgroundColor: '#000', // Change background color on hover
            color: '#fff', // Change text color on hover
          },
        }}
      >
        Demo File Export
      </Button>
        <br />
        <h3>Bulk Upload Users:</h3>
        <form className="mb-5" onSubmit={onSubmit}>
          <div className="md:flex lg:flex gap-10">
            <div className="mb-5 w-full">
              <input
                className="relative bg-white m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding py-2 px-3 text-base font-normal text-[#AFABC3] transition duration-300 ease-in-out file:-mx-3 file:-my-2 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-primary focus:border-blue-300"
                type="file"
                name="excelFile"
                onChange={(info) => handleFileChange(info)}
              />
            </div>
            {/* <div className="mb-5 w-full"></div> */}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            startIcon={<FaUpload />}
            style={{
              marginTop: 15,
              marginBottom: 15,
              border: '1px solid gray', // Add your desired border color and width
              borderRadius: '4px', // Add border radius for rounded corners
              padding: '6px 16px', // Add padding for spacing
              backgroundColor: '#fff', // Add background color
              color: '#000', // Add text color
              cursor: 'pointer', // Add cursor style
              ':hover': {
                backgroundColor: '#000', // Change background color on hover
                color: '#fff', // Change text color on hover
              },
            }}
          >
            {isLoading ? "Uploading..." : "Import"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ImportUser;
