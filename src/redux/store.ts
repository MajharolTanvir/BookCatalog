/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./Api/apiSlice";
import userReducer from "./features/auth/userSlice";


const store = configureStore({
  reducer: {
        auth: userReducer,
      [api.reducerPath]: api.reducer
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
