import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
        "success": true,
        "email":"admin1@wecare.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWU3NGI0NjM4Zjc1MTgwZjM1ZDQ4NiIsImlhdCI6MTY4MTQ4NDM5OCwiZXhwIjoxNjg0MDc2Mzk4fQ.inTfHfm8d0TFcnqENANau_X7Xlxh03lmickSRveipRc"
    },
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {
        token: '',
        email: '',
        success: false
      };
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;