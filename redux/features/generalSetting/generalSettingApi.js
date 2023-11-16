import { api } from "../../api/apiSlice";

const generalSettingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGeneralSetting: builder.mutation({
      query: (data) => ({
        url: "/general-settings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["setting"],
    }),
    getGeneralSetting: builder.query({
      query: () => ({
        url: `/general-setting`,
        method: "GET",
      }),
      invalidatesTags: ["setting"],
    }),
    getlogo: builder.query({
      query: () => ({
        url: `/logo`,
        method: "GET",
      }),
      providesTags: ["setting"],
    }),
  }),
});

export const {
  useCreateGeneralSettingMutation,
  useGetGeneralSettingQuery,
  useGetlogoQuery
} = generalSettingApi;
