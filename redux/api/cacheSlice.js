// cacheSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cacheCleared: false,
};

const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    clearCache: (state) => {
      state.cacheCleared = true;
    },
    cacheCleared: (state) => {
      state.cacheCleared = false;
    },
  },
});

export const { clearCache, cacheCleared } = cacheSlice.actions;

export default cacheSlice.reducer;
