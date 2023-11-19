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
        body: data
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

  }),
});

export const {
  useGetAllNotificationQuery,
  useGetNotificationQuery,
  useGetSingleNotificationMutation,
  useDeleteNotificationMutation
} = notificationApi;
