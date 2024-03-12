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
        }${
          id?.search?.supervise_user_id &&
          "&supervise_user_id=" +
            id?.search?.supervise_user_id
        }${
          id?.search?.supervise2_user_id &&
          "&supervise2_user_id=" +
            id?.search?.supervise2_user_id
        }`,
        method: "GET",
      }),
    }),
  }),
});

export const { useMasterReportQuery } = activityReportApi;
