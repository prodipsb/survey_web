import Link from "next/link";
import React from "react";
import { get } from "../../utils/api/ApiCaller";
import { useGetUserQuery } from "../../redux/features/user/userApi";
import { useRouter } from 'next/router';

function HeaderCard({ preview }) {

  const router = useRouter();

  // const handleRoleUsers = (role) => {
  //   const search = {
  //     role_id: role
  //   }
  
  //   router.push({
  //     pathname: '/user-list',
  //     query: search
  //   });
  // }
  
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 pt-3 lg:pt-5 md:pt-5 lg:w-[90%] 2xl:w-[70%] md:w-[80%] mx-auto">
      {preview?.map((item, index) => (
        <div
          key={index}
          className="lg:w-[90%] w-[65%] mb-3 2xl:w-[90%] md:w-[90%] md:mb-5 mx-auto lg:py-2 md:py-2 text-[#782b90] bg-gradient-to-b from-[#c084fc] via[#7e22ce] to-[#6d28d9] rounded drop-shadow-md text-center"
         // onClick={() => handleRoleUsers(1)}
        >
 
          <p className="text-[30px] text-white">{item?.user_count}</p>
          <p className="text-[13px] pb-2 text-white"> {item?.name} </p>
        </div>
      ))}
    </div>
  );
}

export default HeaderCard;
