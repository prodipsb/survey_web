import { api } from "../../api/apiSlice";

const activityReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    masterReport: builder.query({
      query: (id) => ({
        url: `/master-report?page=${id.page}&&search=${id.search}`,
        method: "GET",
      }),
      //   invalidatesTags: ["user"],
    }),
  }),
});

export const { useMasterReportQuery } = activityReportApi;
