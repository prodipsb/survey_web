import React, { useState } from "react";
import ImageViewer from "../common/imageViewer/ImageViewer";
import Map from "../map/GoogleMap";

import dynamic from 'next/dynamic'; // Import dynamic from 'next/dynamic'
import GoogleMap from "../map/GoogleMap";
import EMap from "../map/Emap";
import { useGetGeneralSettingQuery } from "../../redux/features/generalSetting/generalSettingApi";

const LeafletMap = dynamic(() => import('../map/LeafletMap'), { ssr: false }); // Import LeafletMap component dynamically

const AttendanceDetails = ({ viewData, setViewData }) => {
  const { data } = useGetGeneralSettingQuery();
  const [coordinate, setCoordinate] = useState({
    lat: parseFloat(viewData?.latitude),
    lng: parseFloat(viewData?.longitude)
  });

  // const center = [23.8012609, 90.3576247]; // Example center coordinates
  const zoom = 12; // Example zoom level

  const isValidCoordinate = (coord) =>
    Array.isArray(coord) &&
    coord.length === 2 &&
    !isNaN(coord[0]) &&
    !isNaN(coord[1]);

  const inCordinate = [
    parseFloat(viewData?.in_latitude),
    parseFloat(viewData?.in_longitude)
  ];
  const outCordinate = [
    parseFloat(viewData?.out_latitude),
    parseFloat(viewData?.out_longitude)
  ];


  //  const inCordinate = [parseFloat(viewData?.in_latitude), parseFloat(viewData?.in_longitude)]; 
  //  const outCordinate = [parseFloat(viewData?.out_latitude), parseFloat(viewData?.out_longitude)]; 

  // const inCordinate = [23.8311, 90.4243]; // Example center coordinates
  // const outCordinate = [23.797911, 90.414391]; // Example center coordinates


  return (
    <div className="w-[90%] mx-auto">
      <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
        Attendance Details
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Date : </span>
          {viewData?.date}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Employee ID : </span>
          {viewData?.employee_id}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Role : </span>
          {viewData?.role}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Employee Name : </span>
          {viewData?.user_name}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Employee Mobile : </span>
          {viewData?.user_phone}
        </p>

        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Supervisor : </span>
          {viewData?.supervisor}
        </p>

        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">In Time : </span>
          {viewData?.in_time}
        </p>

        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">In Location : </span>
          {viewData?.in_location}
        </p>

        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Out Location : </span>
          {viewData?.out_location}
        </p>

        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Out Time : </span>
          {viewData?.out_time}
        </p>



        <div className="flex justify-center mt-6 mb-5">
          <button
            onClick={() => setViewData(null)}
            className="border border-gray-400 px-8 py-2 rounded-md text-[14px] hover:bg-gray-400 hover:text-white"
          >
            Back
          </button>
        </div>
      </div>

      {data?.data?.googleMap && isValidCoordinate(inCordinate) && (
        <div style={{ height: '600px', width: '100%', marginTop: '50px', marginBottom: '80px' }}>
          <EMap
            inCordinate={inCordinate}
            outCordinate={isValidCoordinate(outCordinate) ? outCordinate : null}
            zoom={zoom}
            scrollWheelZoom={false}
          />
        </div>
      )}

      {data?.data?.leafletMap && isValidCoordinate(inCordinate) && (
        <div style={{ height: '600px', width: '100%', marginTop: '50px', marginBottom: '80px' }}>
          <LeafletMap
            center={inCordinate}
            outCordinate={isValidCoordinate(outCordinate) ? outCordinate : null}
            zoom={zoom}
            scrollWheelZoom={false}
          />
        </div>
      )}



    </div>
  );
};

export default AttendanceDetails;
