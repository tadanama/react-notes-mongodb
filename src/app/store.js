import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/notes/notesSlice.js";

// Configure the redux store
// Currently have 1 slice for notes
export const store = configureStore({
	reducer: {
		note: noteReducer,
	},
});
