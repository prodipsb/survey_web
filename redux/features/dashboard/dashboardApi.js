import { api } from "../../api/apiSlice";

const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getdashboard: builder.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetdashboardQuery } = dashboardApi;
