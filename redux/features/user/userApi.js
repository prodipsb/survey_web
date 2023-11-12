import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user-create",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users?page=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery } = userApi;
