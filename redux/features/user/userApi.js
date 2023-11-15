import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users?page=${id?.page}&&search=${id?.search?.search}&&start_date=${id?.search?.start_date}&&end_date=${id?.search?.end_date}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: "/user-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetSingleUserQuery,
  useGetUserQuery,
  useDeleteUserMutation,
} = userApi;
