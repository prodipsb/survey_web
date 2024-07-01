const { api } = require("../../api/apiSlice");

const issueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDeviceServices: builder.query({
      query: (params) => {
        const { pagination, page, search } = params || {};
        return {
          url: `/device-services?pagination=${pagination}${page ? "&page=" + page : ""}${search ? "&search=" + search : ""}`,
          method: "GET",
        };
      },
      providesTags: ["deviceServices"],
    }),
    getDeviceService: builder.query({
      query: (id) => ({
        url: `/device-services/${id}`,
        method: "GET",
      }),
      providesTags: ["deviceServices"],
    }),
    
    updateDeviceService: builder.mutation({
      query: (data) => ({
        url: `device-services/${data.id}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["deviceServices"],
    }),
    deleteDeviceService: builder.mutation({
      query: (id) => ({
        url: `/device-services/${id}/delete`,
        method: "POST",
      }),
      invalidatesTags: ["deviceServices"],
    }),
  }),
});

const {
  useGetDeviceServicesQuery,
  useGetDeviceServiceQuery,
  useUpdateDeviceServiceMutation,
  useDeleteDeviceServiceMutation
} = issueApi;

module.exports = {
  useGetDeviceServicesQuery,
  useGetDeviceServiceQuery,
  useUpdateDeviceServiceMutation,
  useDeleteDeviceServiceMutation
};
