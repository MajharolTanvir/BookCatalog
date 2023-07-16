import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  user: {
    name: string | null;
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

export interface ICredential {
  name?: string;
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    name: null, 
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string | null>) => {
      state.user.name = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// export const {  } = counterSlice.actions;

export default userSlice.reducer;
