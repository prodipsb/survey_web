import { api } from "../../api/apiSlice";

const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: (id) => ({
        url: `/notifications?page=${id.page}&&search=${id.search}`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),

    getNotification: builder.query({
      query: () => ({
        url: `/notifications-unread`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),

    getSingleNotification: builder.mutation({
      query: (data) => ({
        url: `/notification-read`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: (data) => ({
        url: "/notification-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
    deleteAllNotification: builder.mutation({
      query: () => ({
        url: "/notifications-delete",
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
    readAllNotification: builder.mutation({
      query: () => ({
        url: "/notifications-as-read",
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useGetNotificationQuery,
  useGetSingleNotificationMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationMutation,
  useReadAllNotificationMutation,
} = notificationApi;
