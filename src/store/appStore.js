import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieoReducer from "./movieoSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movieoData: movieoReducer,
  },
});

export default appStore;
