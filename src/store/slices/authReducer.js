import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const loginHandler = createAsyncThunk('LOGIN_HANDLER',
    async ({username, password}, {rejectWithValue, dispatch}) => {
        try {
            // await new Promise(resolve => setTimeout(() => resolve(), 2000));
            const res = await axios.post('/login', {username: username, password: password});
            const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('expDate', expDate.toISOString());
            dispatch(logout({expireTime: res.data.expiresIn}));
            return res.data.token;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    });
export const registerHandler = createAsyncThunk('REGISTER_HANDLER',
    async ({username, password, email}, {rejectWithValue}) => {
        try {
            // await new Promise(resolve => setTimeout(() => resolve(), 2000));
            const res = await axios.post('/register', {username: username, password: password, email: email});
            return res.data.token;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

export const logout = createAsyncThunk('LOGOUT', async ({expireTime}) => {
    console.log(expireTime);

    await new Promise(resolve => setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expDate');
        resolve();
    }, expireTime));
    return null;
})
export const checkAuthStatus = createAsyncThunk('CHECK_AUTH', async ({}, {dispatch}) => {
    const token = localStorage.getItem('token');
    if (token && new Date(localStorage.getItem('expDate')) >= new Date()) {
        // get token from local storage and restore it
        // noinspection JSCheckFunctionSignatures
        dispatch(loginHandler.fulfilled(token));
        return token;
    } else {
        //delete local storage
        dispatch(logout({expireTime: 0}));
    }
    return null;
})

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
            state.logon = false;
        },
        [loginHandler.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.logon = true;
        },
        [loginHandler.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.logon = false;
        },
        [registerHandler.pending]: (state) => {
            state.loading = true;
        },
        [registerHandler.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
        },
        [registerHandler.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        [logout.fulfilled]: (state, action) => {
            state.logon = false;
            state.token = null;
        },
    }
});


export const authReducer = login.reducer;