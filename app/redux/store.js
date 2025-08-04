import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    theme: themeReducer,
  },
});
