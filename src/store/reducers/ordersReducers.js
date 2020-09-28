import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchOrders = createAsyncThunk('FETCH_ORDER',
    async (payload, {rejectWithValue}) => {
        try {
            await new Promise(resolve => setTimeout(() => resolve(), 2000));
            const orders = await axios.get('/orders');
            return orders.data;
        } catch (e) {
            return rejectWithValue('Error fetching orders.');
        }
    });

const initialState = {
    orders: [],
    loading: false,
    error: null
}

const orders = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchOrders.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.orders = action.payload;
            state.loading = false;
        },
        [fetchOrders.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});


export const orderReducer = orders.reducer;