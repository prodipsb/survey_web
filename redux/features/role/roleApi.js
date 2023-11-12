import { api } from "../../api/apiSlice";

const roleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => ({
        url: "/role-create",
        method: "POST",
        body: data,
      }),
      providesTags: ["role"],
    }),
    getRole: builder.query({
      query: () => ({
        url: `/roles`,
        method: "GET",
      }),
      invalidatesTags: ["role"],
    }),
  }),
});

export const { useCreateRoleMutation, useGetRoleQuery } = roleApi;
