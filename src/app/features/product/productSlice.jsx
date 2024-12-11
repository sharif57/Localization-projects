import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch posts
export const fetchPosts = createAsyncThunk('storeInfo/fetchPosts', async () => {
    const res = await axios.get('https://store-server-green.vercel.app/storeInfo');
    return res.data;
});

// Product slice
const productSlice = createSlice({
    name: 'storeInfo',
    initialState: {
        isLoading: false,
        posts: [], // Renamed from `product` to `posts`
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
            state.error = null;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.posts = [];
            state.error = action.error.message;
        });
    },
});

export default productSlice.reducer;
