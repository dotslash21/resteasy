import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Request {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  body: string;
  headers: Map<string, string[]>;
}

const initialState: Request[] = [];

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<Request>) => {
      state.push(action.payload);
    },
    removeRequest: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addRequest, removeRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
