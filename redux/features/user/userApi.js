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
  }),
});

export const { useCreateUserMutation } = userApi;
