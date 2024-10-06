import { api } from "../../api/apiSlice";

const attendanceReportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    attendanceReport: builder.query({
      query: (data) => {
        const searchParams = new URLSearchParams();

        if (data?.search?.employee_id) {
          searchParams.append("employee_id", data.search.employee_id);
        }
        
        if (data?.search?.search) {
          searchParams.append("search", data.search.search);
        }
    
        if (data?.search?.start_date && data?.search?.end_date) {
          searchParams.append("start_date", data.search.start_date);
          searchParams.append("end_date", data.search.end_date);
        }

        if (data?.search?.supervise_user_id) {
          searchParams.append("supervise_user_id", data.search.supervise_user_id);
        }

        if (data?.search?.supervise2_user_id) {
          searchParams.append("supervise2_user_id", data.search.supervise2_user_id);
        }

        if (data?.search?.supervise3_user_id) {
          searchParams.append("supervise3_user_id", data.search.supervise3_user_id);
        }

        if (data?.search?.supervise4_user_id) {
          searchParams.append("supervise4_user_id", data.search.supervise4_user_id);
        }
    
        const url = `/attendance-report?page=${data?.page}&${searchParams.toString()}`;
    
        return {
          url,
          method: "GET",
        };
      },
      // providesTags: ["report"],
    }),  

  }),
});

export const { useAttendanceReportQuery } = attendanceReportApi;
