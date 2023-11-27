import { api } from "../../api/apiSlice";

const pushNotificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDevicetoken: builder.query({
      query: () => ({
        url: "/device-tokens",
        method: "GET",
      }),
      providesTags: ["pushNotification"],
    }),
  }),
});

export const { useGetDevicetokenQuery } = pushNotificationApi;
