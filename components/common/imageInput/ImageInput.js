import Link from "next/link";
import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const ImageInput = ({ data, handleChange, name, style, view }) => {
  const createStyle = `w-full rounded-md border border-solid border-gray-300 relative ${style}`;
  return (
    <div className={view ? "" : createStyle}>
      {data?.file?.name ? (
        <p className="px-5 py-2.5 text-sm truncate">{data?.file?.name}</p>
      ) : (
        <Link
          href={`${process.env.NEXT_PUBLIC_IMAGE}${data?.file}`}
          target="_blank"
        >
          <p
            className={view ? "cursor-pointer" : "px-5 py-2.5 text-sm truncate"}
          >
            {data?.file?.name ? data?.file?.name : data?.file?.split("/")[2]}
          </p>
        </Link>
      )}
      {!view && (
        <RxCrossCircled
          size={18}
          className="absolute top-[-8px] right-[-8px] bg-white cursor-pointer"
          onClick={(e) => handleChange(e, data?.id, name)}
        />
      )}
    </div>
  );
};

export default ImageInput;
