import { api } from "../../api/apiSlice";

const activityReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    masterReport: builder.query({
      query: (id) => ({
        url: `/master-report?page=${id?.page}${
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

export const { useMasterReportQuery } = activityReportApi;
