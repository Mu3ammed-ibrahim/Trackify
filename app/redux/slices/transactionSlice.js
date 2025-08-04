// app/redux/slices/transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.list = state.list.filter(tx => tx.id !== action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.list.findIndex(tx => tx.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    setTransactions: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  setTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
