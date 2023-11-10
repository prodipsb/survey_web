import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
  token_type: "",
};

const loginSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.access_token = action.payload.access_token;
      state.token_type = action.payload.token_type;
    },
    userLogout: (state) => {
      state.access_token = "";
      state.token_type = "";
    },
  },
});

export const { userLogin, userLogout } = loginSlice.actions;

export default loginSlice.reducer;
