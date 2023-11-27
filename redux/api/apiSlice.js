import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogout } from "../features/login/loginSlice";
import store from "../store";

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
    validateStatus: (response) => {
      if (response.status === 401) {
        store.dispatch(userLogout());
      } else {
        return response;
      }
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
