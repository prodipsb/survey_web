import Image from "next/image";
import Link from "next/link";
import React from "react";

const ImageViewer = ({ image }) => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_IMAGE}${image}`} target="_blank">
      {image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE}${image}`}
          height={200}
          width={200}
          alt=""
          onClick={() => {}}
          unoptimized
        />
      )}
    </Link>
  );
};

export default ImageViewer;
