import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchOrders = createAsyncThunk('FETCH_ORDER',
    async (payload, {rejectWithValue}) => {
        try {
            // await new Promise(resolve => setTimeout(() => resolve(), 2000));
            const orders = await axios.get('/orders');
            return orders.data;
        } catch (e) {
            return rejectWithValue('Error fetching orders.');
        }
    });
export const createOrder = createAsyncThunk('CREATE_ORDER',
    async ({ingredientsCount, price, customer}, {rejectWithValue}) => {
        try {
            await axios.put('/order', {
                price: price,
                ingredients: ingredientsCount,
                customer: customer
            })
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });

const initialState = {
    orders: [],
    loading: false,
    error: null,
    orderCreatedSuccessfully: false
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
        [createOrder.pending]: (state) => {
            state.loading = true;
            state.orderCreatedSuccessfully = false;
        },
        [createOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.orderCreatedSuccessfully = true;
        },
        [createOrder.rejected]: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.orderCreatedSuccessfully = false;
        },
    }
});


export const orderReducer = orders.reducer;