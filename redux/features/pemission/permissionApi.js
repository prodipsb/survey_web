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
        url: `/permissions?page=${id?.page}&pagination=${id?.pagination}${
          id?.search ? "&search=" + id?.search : ""
        }`,
        method: "GET",
      }),
      providesTags: ["permission"],
    }),
    permissionByRole: builder.query({
      query: (id) => ({
        url: `/permission-by-role?role_id=${id}`,
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
    setUserPermission: builder.mutation({
      query: (data) => ({
        url: `/set-permission`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["permission"],
    }),
    removeUserPermission: builder.mutation({
      query: (data) => ({
        url: `role/remove-permissions`,
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
  usePermissionByRoleQuery,
  useSetUserPermissionMutation,
  useRemoveUserPermissionMutation,
} = permissionApi;
