import { api } from "../../api/apiSlice";

const roleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => ({
        url: "/role-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
    getRole: builder.query({
      query: (id) => ({
        url: `/roles?pagination=${id?.pagination}${
          id?.page && "&page=" + id?.page 
        }${id?.search && "&search=" + id?.search}`,
        method: "GET",
      }),
      providesTags: ["role",'permission'],
    }),
    setUerRole: builder.mutation({
      query: (data) => ({
        url: "/set-role",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
    deleteRole: builder.mutation({
      query: (data) => ({
        url: "/role-delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
    getUserWithRole: builder.query({
      query: (id) => ({
        url: `/role/users?id=${id.id}&pagination=${id?.pagination}&page=${id?.page}${
          id?.search !== "" && `&search=${id?.search}`
        }`,
        method: "GET",
      }),
      providesTags: ["role"],
    }),
    getUserWithoutRole: builder.query({
      query: (id) => ({
        url: `/users/exclude-role?role_id=${id}`,
        method: "GET",
      }),
      providesTags: ["role"],
    }),
    userRoleRemove: builder.mutation({
      query: (data) => ({
        url: `/user/role-remove`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
    getUpperRoles: builder.query({
      query: (id) => ({
        url: `/roles/upper-roles?role_id=${id}`,
        method: "GET",
      }),
      providesTags: ["role"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetRoleQuery,
  useDeleteRoleMutation,
  useSetUerRoleMutation,
  useLazyGetUserWithRoleQuery,
  useGetUserWithoutRoleQuery,
  useUserRoleRemoveMutation,
  useGetUpperRolesQuery,
  useGetUserWithRoleQuery
} = roleApi;

export default roleApi;