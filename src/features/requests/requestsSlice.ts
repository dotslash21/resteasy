import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface Header {
  key: string;
  value: string;
}

export interface Request {
  method: RequestMethod;
  url: string;
  body: string;
  headers: Header[];
}

export interface UpdateRequest {
  index: number;
  request: Request;
}

const initialState: Request[] = [];

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<Request>) => {
      state.push(action.payload);
    },
    updateRequest: (state, action: PayloadAction<UpdateRequest>) => {
      state[action.payload.index] = {
        ...state[action.payload.index],
        ...action.payload.request,
      };
    },
    removeRequest: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addRequest, updateRequest, removeRequest } =
  requestsSlice.actions;

export default requestsSlice.reducer;
