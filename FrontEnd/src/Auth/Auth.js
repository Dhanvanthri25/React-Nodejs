import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      if (action.payload.role === 'Admin') {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const autoLogout = () => (dispatch) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    if (expiryTime < currentTime) {
      dispatch(logout());
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      window.location.replace('/');
    }
  }
};

export default authSlice.reducer;
