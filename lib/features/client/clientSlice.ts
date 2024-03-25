import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  activeClient: any | {};
}

const initialState: SidebarState = {
  activeClient: typeof window !== "undefined" && window.location.origin
  ? window.location.origin: {},
};

const sidebarSlice = createSlice({
  name: "activeClient",
  initialState,
  reducers: {
    setClient(state, action: PayloadAction<any>) {
      state.activeClient = action.payload;
      localStorage.setItem("activeClient", action.payload);
    },
  },
});

export const { setClient } = sidebarSlice.actions;
export default sidebarSlice.reducer;
