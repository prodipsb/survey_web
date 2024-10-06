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
    getAllPushNotification: builder.query({
      query: (data) => ({
        url: `/push-notifications?page=${data.page}&&search=${data.search}`,
        method: "GET",
      }),
      providesTags: ["pushNotification"],
    }),
    createPushNotification: builder.mutation({
      query: (data) => ({
        url: "/push-notification-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pushNotification"],
    }),
    deletePushNotification: builder.mutation({
      query: (data) => ({
        url: "/push-notification-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pushNotification"],
    }),
  }),
});

export const { 
  useGetDevicetokenQuery,
  useCreatePushNotificationMutation,
  useGetAllPushNotificationQuery,
  useDeletePushNotificationMutation
} = pushNotificationApi;
