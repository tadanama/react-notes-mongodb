import { createSlice } from "@reduxjs/toolkit";

// Initialize the note slice state
const initialState = {
	notes: [], // All notes will be stored in an array
	isLoading: false,
	isError: false,
	error: null,
};

// Create a note slice
// Part of the store that will store the note data
export const noteSlice = createSlice({
	name: "note",
	initialState,
	extraReducers: {},  // Handle note async thunk
});

// Export the note slice reducer
// To include in the store.js
export default noteSlice.reducer;
