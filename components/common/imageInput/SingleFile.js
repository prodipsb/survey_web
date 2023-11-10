import Link from "next/link";
import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const SingleFile = ({ data, handleChange, name, view }) => {
  const createStyle =
    "w-full lg:max-w-[363.99px] 2xl:max-w-full rounded-md border border-solid border-gray-300 relative md:max-w-[295.48px]";
  return (
    <div className={view ? "" : createStyle}>
      {data?.name ? (
        <p className="px-5 py-2.5 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {data?.name}
        </p>
      ) : (
        <Link href={`${process.env.NEXT_PUBLIC_IMAGE}${data}`} target="_blank">
          <p
            className={
              view
                ? "cursor-pointer"
                : "px-5 py-2.5 text-sm text-ellipsis overflow-hidden whitespace-nowrap"
            }
          >
            {data?.split("/")[2]}
          </p>
        </Link>
      )}
      {!view && (
        <RxCrossCircled
          size={18}
          className="absolute top-[-8px] right-[-8px] bg-white cursor-pointer"
          onClick={(e) => handleChange(e, name)}
        />
      )}
    </div>
  );
};

export default SingleFile;
