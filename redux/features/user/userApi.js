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
      query: (data) => {
        const searchParams = new URLSearchParams();
        
        if (data?.search?.search) {
          searchParams.append("search", data.search.search);
        }
    
        if (data?.search?.start_date && data?.search?.end_date) {
          searchParams.append("start_date", data.search.start_date);
          searchParams.append("end_date", data.search.end_date);
        }
    
        const url = `/users?page=${data?.page}&${searchParams.toString()}`;
    
        return {
          url,
          method: "GET",
        };
      },
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
    statusUser: builder.mutation({
      query: (data) => ({
        url: "/user-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    importUser: builder.mutation({
      query: (data) => ({
        url: "/user-import",
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
  useGetAllUserQuery,
  useUserProfileQuery,
  useStatusUserMutation,
  useImportUserMutation
} = userApi;
