import { Client } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  activeClient: any | {};
}

const initialState: SidebarState = {
  activeClient: {},
};

const sidebarSlice = createSlice({
  name: "activeClient",
  initialState,
  reducers: {
    setClient(state, action: PayloadAction<any>) {
      state.activeClient = action.payload;
    },
  },
});

export const { setClient } = sidebarSlice.actions;
export default sidebarSlice.reducer;
