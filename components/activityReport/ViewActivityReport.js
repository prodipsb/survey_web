import React, { useState } from "react";
import ImageViewer from "../common/imageViewer/ImageViewer";
import Map from "../map/GoogleMap";

import dynamic from 'next/dynamic'; // Import dynamic from 'next/dynamic'
import { useGetGeneralSettingQuery } from "../../redux/features/generalSetting/generalSettingApi";
import EMap from "../map/Emap";

// const LeafletMap = dynamic(() => import('../map/LeafletMap'), { ssr: false }); 

const LeafletMap = dynamic(() => import('../map/LeafletMap'), { ssr: false });

const ViewActivityReport = ({ viewData, setViewData }) => {
  console.log('details view', viewData)
  const [coordinate, setCoordinate] = useState({
    lat: parseFloat(viewData?.latitude),
    lng: parseFloat(viewData?.longitude)
  });

  const { data } = useGetGeneralSettingQuery();

  const center = [parseFloat(viewData?.latitude), parseFloat(viewData?.longitude)]; // Example center coordinates
 // const center = [23.8012609, 90.3576247]; // Example center coordinates
  const zoom = 15; // Example zoom level


  console.log('all viewData', viewData)
  console.log('all viewData latitute', viewData.latitude)
  console.log('all coordinate', coordinate)
  return (
    <div className="w-[90%] mx-auto">
      <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
        Survey Report Details
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Date: </span>
          {viewData?.date}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Employee ID: </span>
          {viewData?.employee_id}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Role: </span>
          {viewData?.role}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Employee Name: </span>
          {viewData?.surveySubmittedUserName}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Employee Mobile: </span>
          {viewData?.surveySubmittedUserPhone}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Employee Email: </span>
          {viewData?.surveySubmittedUserEmail}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Supervisor: </span>
          {viewData?.supervisor}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">BIN Number: </span>
          {viewData?.binNumber}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">BIN Holder Name: </span>
          {viewData?.binHolderName}
        </p>
        {viewData?.binHolderEmail && (
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[16px]">
              BIN Holder Email (optional):{" "}
            </span>
            {viewData?.binHolderEmail}
          </p>
        )}
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">BIN Holder Mobile: </span>
          {viewData?.binHolderMobile}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">CommissioneRate: </span>
          {viewData?.commissioneRate}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Division: </span>
          {viewData?.division}
        </p>

        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Circle: </span>
          {viewData?.circle}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Shop Name: </span>
          {viewData?.shopName}
        </p>
        {viewData?.brandname && (
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[16px]">
              Brand Name (optional):{" "}
            </span>
            {viewData?.brandname}
          </p>
        )}

        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Number of Outlet: </span>
          {viewData?.numberOfOutlet}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Number of Counter: </span>
          {viewData?.numberOfCounter}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Transaction Type: </span>
          {viewData?.transactionType}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Mushak: </span>
          {viewData?.transactionType}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">POS Software Provider: </span>
          {viewData?.posSoftwareProvider}
        </p>
        {viewData?.posSoftwareProvider === "Third Party" && (
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[16px]">Third Party Name: </span>
            {viewData?.thirdPartyName}
          </p>
        )}
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">NBR Approved: </span>
          {viewData?.nrbApproved}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Monthly Average Sales: </span>
          {viewData?.mushak}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">
            Monthly Average Customer:
          </span>
          {viewData?.monthlyAverageCustomer}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Online Sale Available: </span>
          {viewData?.onlineSaleAvailable}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Online Sale Percent: </span>
          {viewData?.onlineSaleParcent}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Online Order Mode: </span>
          {viewData?.onlineOrderMode}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Product Information: </span>
          {viewData?.productInfo}
        </p>
        {viewData?.productInfo === "Type" && (
          <>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[16px]">Product Name: </span>
              {viewData?.productName}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[16px]">Product Unit: </span>
              {viewData?.productUnit}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[16px]">Unit Price: </span>
              {viewData?.unitPrice}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[16px]">Vat Percent: </span>
              {viewData?.vatParcent} %
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[16px]">SD Percent: </span>
              {viewData?.sdPercent} %
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[16px]">
                Price Including VAT:{" "}
              </span>
              {viewData?.priceIncludingVat}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[16px]">
                Price Excluding VAT:{" "}
              </span>
              {viewData?.priceExcludingVat}
            </p>
          </>
        )}
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Stock Keeping: </span>
          {viewData?.stockKeeping}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">POS Software: </span>
          {viewData?.posSoftware}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">POS Printer: </span>
          {viewData?.posPrinter}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">PC/Laptop: </span>
          {viewData?.pcOrLaptop}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Router: </span>
          {viewData?.router}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Networking: </span>
          {viewData?.networking}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Surveillance: </span>
          {viewData?.surveillance}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Mobile Operator: </span>
          {viewData?.mobileOperator}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">
            Mobile Operator Coverage:{" "}
          </span>
          {viewData?.operatorCoverage}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">
            Business Registered Adddress:{" "}
          </span>
          {viewData?.businessRegisteredAddress}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Outlet Address: </span>
          {viewData?.outletAddress}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Category: </span>
          {viewData?.category}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Sub Category: </span>
          {viewData?.subCategory}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[16px]">Weekly Holiday: </span>
          {viewData?.weeklyHoliday}
        </p>
      </div>
      <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
        <div>
          <p className="mb-3 text-[#646C9A] font-bold">Shop picture:</p>
          <ImageViewer image={viewData?.shopPic} />
        </div>
        <div>
          <p className="mb-3 text-[#646C9A] font-bold">BIN Certificate:</p>
          <ImageViewer image={viewData?.binCertificate} />
        </div>
      </div>
      <div className="mt-5">
        <p className="mb-3 text-[#646C9A] font-bold">Item List:</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
          {viewData?.serveyItemList?.map((item, index) => (
            <ImageViewer image={`/${item?.url}`} key={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2 mb-5">
        <button
          onClick={() => setViewData(null)}
          className="border border-gray-400 px-8 py-2 rounded-md text-[14px] hover:bg-gray-400 hover:text-white"
        >
          Back
        </button>
      </div>

      {/* <div style={{ height: '600px', width: '100%', marginTop: '50px', marginBottom: '80px'}}>
      <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false} /> 
      </div> */}

      {data?.data?.googleMap && (
        <div style={{ height: '600px', width: '100%', marginTop: '50px', marginBottom: '80px' }}>
          {/* <GoogleMap center={center} zoom={zoom} scrollWheelZoom={false} /> Render GoogleMap component */}
          <EMap inCordinate={center} outCordinate={center} zoom={zoom} scrollWheelZoom={false} /> {/* Render GoogleMap component */}
        </div>
      )}

      {data?.data?.leafletMap && (
        <div style={{ height: '600px', width: '100%', marginTop: '50px', marginBottom: '80px' }}>
          <LeafletMap center={center} outCordinate={center} zoom={zoom} scrollWheelZoom={false} /> {/* Render LeafletMap component */}
        </div>
      )}


    </div>
  );
};

export default ViewActivityReport;
