import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const loginHandler = createAsyncThunk('LOGIN_HANDLER',
    async ({username, password}, {rejectWithValue}) => {
        try {
            // await new Promise(resolve => setTimeout(() => resolve(), 2000));
            const res = await axios.post('/login', {username: username, password: password});
            console.dir(res);
            return res.data.token;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

const initialState = {
    token: null,
    loading: false,
    error: null,
    logon: false
}

const login = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: {
        [loginHandler.pending]: (state) => {
            state.loading = true;
        },
        [loginHandler.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
        },
        [loginHandler.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});


export const authReducer = login.reducer;