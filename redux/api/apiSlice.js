import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().loginInfo?.access_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "user",
    "role",
    "permission",
    "notification",
    "setting",
    "pushNotification",
  ],
  endpoints: () => ({}),
});
