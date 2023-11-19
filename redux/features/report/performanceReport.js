import { api } from "../../api/apiSlice";

const performanceReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    performanceReport: builder.query({
      query: (id) => ({
        url: `/performance-report?page=${id?.page}${
          id?.search?.search && "&search=" + id?.search?.search
        }${
          id?.search?.start_date &&
          "&start_date=" +
            id?.search?.start_date +
            "&end_date=" +
            id?.search?.end_date
        }`,
        method: "GET",
      }),
    }),
  }),
});

export const { usePerformanceReportQuery } = performanceReportApi;
