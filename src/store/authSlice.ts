import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
    loadTokenFromStorage: (state) => {
      const token = localStorage.getItem('token');
      state.token = token;
    }
  }
});

export const { setToken, loadTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
