import { api } from "../../api/apiSlice";

const permissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPermission: builder.mutation({
      query: (data) => ({
        url: "/permission-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["permission"],
    }),
    getPermission: builder.query({
      query: (id) => ({
        url: `/permissions?page=${id?.page}&&search=${id?.search}`,
        method: "GET",
      }),
      providesTags: ["permission"],
    }),
    deletePermission: builder.mutation({
      query: (data) => ({
        url: `/permission-delete`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["permission"],
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useGetPermissionQuery,
  useDeletePermissionMutation,
} = permissionApi;
