import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchOrders = createAsyncThunk('FETCH_ORDER',
    async (userId, {rejectWithValue, getState}) => {
        try {
            // await new Promise(resolve => setTimeout(() => resolve(), 2000));
            let APIEndpoint = '/orders';
            if (userId) {
                APIEndpoint += '/' + userId
            }
            const orders = await axios.post(APIEndpoint, {token: getState().auth.token});
            return orders.data;
        } catch (e) {
            return rejectWithValue('Error fetching orders.');
        }
    });
export const createOrder = createAsyncThunk('CREATE_ORDER',
    async ({ingredientsCount, price, customer, userId}, {rejectWithValue, getState}) => {
        try {
            await axios.put('/order', {
                price: price,
                ingredients: ingredientsCount,
                customer: customer,
                token: getState().auth.token,
                userId: userId
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
            state.error = null;
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
            state.error = null;
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