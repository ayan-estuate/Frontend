import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { FormState, FormValues } from '@/types/form';

export const setFormData = createAsyncThunk<FormValues, FormValues>(
  'form/setFormData',
  async (formData) => {
    // Simulating async operation if needed
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...formData, isDisabled: true };
  }
);

const initialState: FormState = {
  data: null,
  loading: false,
  error: null
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetForm: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setFormData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setFormData.fulfilled, (state, action: PayloadAction<FormValues>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  }
});

export const { resetForm } = formSlice.actions;
export default formSlice.reducer;
