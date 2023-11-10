import { useRouter } from "next/router";
import { ElementType, useEffect, useState } from "react";

export default function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();
    const role = "";
    useEffect(() => {
      if (!role) {
        router.replace("/login");
      }
    }, [role]);
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
