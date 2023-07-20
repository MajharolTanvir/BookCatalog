/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICredential } from "../../../Types/GlobalTypes";

export interface IUserState {
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  };
}

const initialState: IUserState = {
  user: {
    firstName: null,
    lastName: null,
    email: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ICredential>) => {
      state.user.firstName = action.payload?.firstName;
      state.user.lastName = action.payload?.lastName;
      state.user.email = action.payload?.email;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
