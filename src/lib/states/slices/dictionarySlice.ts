import { getDictionary } from '@/lib/dictionaries';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

type InitialState = {
  content: Dictionary | null;
};

const initialState: InitialState = {
  content: null,
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    initializeDictionary: (state, action: PayloadAction<Dictionary>) => {
      state.content = action.payload;
    }
  },
});

export const { initializeDictionary } = dictionarySlice.actions;
export default dictionarySlice.reducer;