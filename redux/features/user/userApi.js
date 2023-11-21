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
        url: `/users?page=${id?.page}${
          id?.search?.search && "&search=" + id?.search?.search
        }${
          id?.search?.start_date &&
          "&start_date=" +
            id?.search?.start_date +
            "&end_date=" +
            id?.search?.end_date
        }`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: (id) => ({
        url: `/all-users`,
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
    userProfile: builder.query({
      query: (data) => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetSingleUserQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUserProfileQuery,
} = userApi;
