const { api } = require("../../api/apiSlice");

const issueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createDeviceIssue: builder.mutation({
      query: (data) => ({
        url: "device-service-issue",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["deviceIssues"],
    }),
    getDeviceIssue: builder.query({
      query: (id) => ({
        url: `/device-service-issue/${id}/edit`,
        method: "GET",
      }),
      providesTags: ["deviceIssues"],
    }),
    getDeviceIssues: builder.query({
      query: (params) => {
        const { pagination, page, search } = params || {};
        return {
          url: `/device-service-issue?pagination=${pagination}${page ? "&page=" + page : ""}${search ? "&search=" + search : ""}`,
          method: "GET",
        };
      },
      providesTags: ["deviceIssues"],
    }),
    updateDeviceIssue: builder.mutation({
      query: (data) => ({
        url: `device-service-issue/${data.id}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["deviceIssues"],
    }),
    deleteDeviceIssue: builder.mutation({
      query: (id) => ({
        url: `/device-service-issue/${id}/delete`,
        method: "POST",
      }),
      invalidatesTags: ["deviceIssues"],
    }),
  }),
});

const {
  useCreateDeviceIssueMutation,
  useGetDeviceIssuesQuery,
  useGetDeviceIssueQuery,
  useUpdateDeviceIssueMutation,
  useDeleteDeviceIssueMutation,
} = issueApi;

module.exports = {
  useCreateDeviceIssueMutation,
  useGetDeviceIssuesQuery,
  useGetDeviceIssueQuery,
  useUpdateDeviceIssueMutation,
  useDeleteDeviceIssueMutation,
};
