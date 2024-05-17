import { createSlice } from "@reduxjs/toolkit";
import {  getpost, getpostbyid, handlefilter, handleprofile, handlesearch, handlesearchchange, postupdate, profilehandle } from "../actions/post";
const initialState = {
  posts: [],
  allposts:[],
  update: {},
  Profile:[],
  searchby:[],
  loading: false,
  error: null,

};
export const postSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getpost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getpost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.allposts=action.payload;
    });
    builder.addCase(getpost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getpostbyid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getpostbyid.fulfilled, (state, action) => {
      state.loading = false;
      state.update = action.payload;
    });
    builder.addCase(getpostbyid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(profilehandle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(profilehandle.fulfilled, (state, action) => {
      state.loading = false;
      state.Profile = action.payload;
    });
    builder.addCase(profilehandle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(handlefilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handlefilter.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(handlefilter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(handlesearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handlesearch.fulfilled, (state, action) => {
      state.loading = false;
      state.searchby = action.payload;
    });
    builder.addCase(handlesearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(handlesearchchange.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handlesearchchange.fulfilled, (state, action) => {
      state.loading = false;
      state.posts=action.payload
    });
    builder.addCase(handlesearchchange.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
