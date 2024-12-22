import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NOTE_URL = "http://localhost:5000/api/notes";

// Initialize the note slice state
const initialState = {
	notes: [], // All notes will be stored in an array
	status: "loading", // "succeeded" || "failed"
	error: null,
};

// Get all notes
export const getAllNotes = createAsyncThunk("note/getAllNotes", async () => {
	// Send get request to get all notes from backend
	try {
		console.log("Inside getAllNotes asyncthunk try");
		const response = await axios.get(`${NOTE_URL}/`);

		// Send the result from the request to the extra reducers
		return response.data.data;
	} catch (error) {
		console.log("Inside getAllNotes asyncthunk catch");
		console.log("Error:", error.message);
		return error.message;
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
				state.status = "loading";
			})
			.addCase(getAllNotes.fulfilled, (state, action) => {
				state.status = "succeeded";

				// Set the notes array initial state to the response from backend
				state.notes = state.notes.concat(action.payload);
			})
			.addCase(getAllNotes.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}, // Handle note async thunk
});

// Export notes array state selector
export const selectAllNotes = (state) => state.note.notes;

// Export status state selector
export const selectNoteStatus = (state) => state.note.status;

// Export the error state selector
export const selectNoteError = (state) => state.note.error;

// Export the note slice reducer
// To include in the store.js
export default noteSlice.reducer;
