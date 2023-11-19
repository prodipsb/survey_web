import React from "react";
import ImageViewer from "../common/imageViewer/ImageViewer";

const ViewActivityReport = ({ viewData, setViewData }) => {
  return (
    <div className="w-[90%] mx-auto">
      <p className="font-bold text-[#646C9A] text-center text-[24px] mt-5 mb-5">
        View Report
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Date: </span>
          {viewData?.date}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Submitted User: </span>
          {viewData?.submitted_user_name}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Submitted User Mobile:</span>
          {viewData?.submitted_user_mobile}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">BIN Holder Name: </span>
          {viewData?.binHolderName}
        </p>
        {viewData?.binHolderEmail && (
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">
              BIN HOlder Email (optional):{" "}
            </span>
            {viewData?.binHolderEmail}
          </p>
        )}
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">BIN Holder Mobile: </span>
          {viewData?.binHolderMobile}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Division: </span>
          {viewData?.division}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Sub Division: </span>
          {viewData?.subDivision}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Circle: </span>
          {viewData?.circle}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Shop Name: </span>
          {viewData?.shopName}
        </p>
        {viewData?.brandname && (
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">
              Brand Name (optional):{" "}
            </span>
            {viewData?.brandname}
          </p>
        )}
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">
            Business Registered Adddress:{" "}
          </span>
          {viewData?.businessRegisteredAddress}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Shop Name: </span>
          {viewData?.outletAddress}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Category: </span>
          {viewData?.category}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Sub Category: </span>
          {viewData?.subCategory}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Number of Outlet: </span>
          {viewData?.numberOfOutlet}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Number of Counter: </span>
          {viewData?.numberOfCounter}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Transaction Type: </span>
          {viewData?.transactionType}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Mushak 6.3: </span>
          {viewData?.transactionType}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">POS Software Provider: </span>
          {viewData?.posSoftwareProvider}
        </p>
        {viewData?.posSoftwareProvider === "Third Party" && (
          <p className="mb-3 text-[#646C9A]">
            <span className="font-bold text-[14px]">Third Party Name: </span>
            {viewData?.thirdPartyName}
          </p>
        )}
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">NBR Approved: </span>
          {viewData?.nrbApproved}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Monthly Average Sales: </span>
          {viewData?.mushak}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">
            Monthly Average Customer:{" "}
          </span>
          {viewData?.monthlyAverageCustomer}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Online Sale Available: </span>
          {viewData?.onlineSaleAvailable}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Online Sale Percent: </span>
          {viewData?.onlineSaleParcent}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Online Order Mode: </span>
          {viewData?.onlineOrderMode}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Product Information: </span>
          {viewData?.productInfo}
        </p>
        {viewData?.productInfo === "Type" && (
          <>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Product Name: </span>
              {viewData?.productName}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Product Unit: </span>
              {viewData?.productUnit}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Unit Price: </span>
              {viewData?.unitPrice}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">Vat Percent: </span>
              {viewData?.vatParcent} %
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">SD Percent: </span>
              {viewData?.sdPercent} %
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">
                Price Including VAT:{" "}
              </span>
              {viewData?.priceIncludingVat}
            </p>
            <p className="mb-3 text-[#646C9A]">
              <span className="font-bold text-[14px]">
                Price Excluding VAT:{" "}
              </span>
              {viewData?.priceExcludingVat}
            </p>
          </>
        )}
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Stock Keeping: </span>
          {viewData?.stockKeeping}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">POS Software: </span>
          {viewData?.posSoftware}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">POS Printer: </span>
          {viewData?.posPrinter}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">PC/Laptop: </span>
          {viewData?.pcOrLaptop}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Router: </span>
          {viewData?.router}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Networking: </span>
          {viewData?.networking}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Surveillance: </span>
          {viewData?.surveillance}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">Mobile Operator: </span>
          {viewData?.mobileOperator}
        </p>
        <p className="mb-3 text-[#646C9A]">
          <span className="font-bold text-[14px]">
            Mobile Operator Coverage:{" "}
          </span>
          {viewData?.operatorCoverage}
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
      <div className="flex justify-center mt-5 mb-10">
        <button
          onClick={() => setViewData(null)}
          className="border border-gray-400 px-8 py-2 rounded-md text-[14px] hover:bg-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ViewActivityReport;
