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

// Async thunk to create a note
export const addNote = createAsyncThunk("note/addNote", async (newNote) => {
	// Send post request to backend
	try {
		const response = await axios.post(NOTE_URL, newNote);
		// Send the newly created note to the fulfilled addNote reducer
		return response.data.data;
	} catch (error) {
		console.log(error);
	}
});

// Async thunk to update a note
export const updateNote = createAsyncThunk(
	"note/updateNote",
	async (updatedNote) => {
		// Send patch request to backend
		try {
			const response = await axios.patch(
				`${NOTE_URL}/${updatedNote.id}`,
				updatedNote
			);
			console.log("Response to update:", response);
			// Send the response from axios to fulfilled updateNote reducer
			return response.data.data;
		} catch (error) {
			console.log(error);
		}
	}
);

// Async thunk to delete a note
export const deleteNote = createAsyncThunk(
	"note/deleteNote",
	async (noteIdToDelete) => {
		console.log("Note id to delete:", noteIdToDelete);
		// Send delete request to backend
		try {
			const response = await axios.delete(`${NOTE_URL}/${noteIdToDelete}`);
			console.log("Response from axios when delete:", response);
			// Send the response from axios (data of the deleted note) to deleteNote fulfilled reducer
			return response.data.data;
		} catch (error) {
			console.log(error);
		}
	}
);

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
			})
			.addCase(addNote.pending, (state) => {
				state.status = "loading";
			})
			.addCase(addNote.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.notes = [...state.notes, action.payload];
			})
			.addCase(addNote.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateNote.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateNote.fulfilled, (state, action) => {
				state.status = "succeeded";

				console.log("Inside updateNote fulfilled");
				console.log("Action payload:", action.payload);

				// Filter out note that did not have the same id as the updated note
				const otherNote = state.notes.filter(
					(note) => note._id !== action.payload._id
				);

				// Combine the filtered note with the newly updated note
				state.notes = [...otherNote, action.payload];
			})
			.addCase(updateNote.rejected, (state) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteNote.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteNote.fulfilled, (state, action) => {
				state.status = "succeeded";

				const filteredNote = state.notes.filter(
					(note) => note._id !== action.payload._id
				);

				state.notes = filteredNote;
			})
			.addCase(deleteNote.rejected, (state, action) => {
				state.status = "failed";
			});
	}, // Handle note async thunk
});

// Export notes array state selector
export const selectAllNotes = (state) => state.note.notes;

// Export status state selector
export const selectNoteStatus = (state) => state.note.status;

// Export the error state selector
export const selectNoteError = (state) => state.note.error;

// // Export selector to get notes by id
// export const selectNoteById = (state, id) =>
// 	state.note.notes.find(note._id === id);

// Export the note slice reducer
// To include in the store.js
export default noteSlice.reducer;
