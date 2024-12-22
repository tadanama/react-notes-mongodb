import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NOTE_URL = "http://localhost:5000/api/notes";

// Initialize the note slice state
const initialState = {
	notes: [], // All notes will be stored in an array
	isLoading: false,
	isError: false,
	error: null,
};

// Get all notes
export const getAllNotes = createAsyncThunk("note/getAllNotes", async () => {
	// Send get request to get all notes from backend
	try {
		console.log("Inside getAllNotes asyncthunk try");
		const response = await axios.get(`${NOTE_URL}/`);
		console.log(response);

		// Send the result from the request to the extra reducers
		return response.data.data;
	} catch (error) {
		console.log("Inside getAllNotes asyncthunk catch");
		console.error(error);
	}
});

// Create a note slice
// Part of the store that will store the note data
export const noteSlice = createSlice({
	name: "note",
	initialState,
	extraReducers(builder) {
		builder
			.addCase(getAllNotes.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getAllNotes.fulfilled, (state, action) => {
				state.isLoading = false;

				console.log("Inside getAllNotes fulfilled case");
				console.log(action.payload);

				// Set the notes array initial state to the response from backend
				state.notes = action.payload;
			})
			.addCase(getAllNotes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;

				console.log("Inside rejected getAllnotes");
				console.log(action.payload);
			});
	}, // Handle note async thunk
});

// Export the note slice reducer
// To include in the store.js
export default noteSlice.reducer;
