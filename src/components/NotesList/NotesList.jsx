import React, { useEffect } from "react";
import "./NotesList.css";
import { useSelector } from "react-redux";
import {
	selectAllNotes,
	selectNoteError,
	selectNoteStatus,
} from "../../features/notes/notesSlice";
import NoteItem from "./NoteItem";

function NotesList() {
	// Get all notes from the redux store
	const allNotes = useSelector(selectAllNotes);
	// console.log("Inside NoteList component");
	// console.log(allNotes);

	// Get the status of the note slice
	const status = useSelector(selectNoteStatus);
	// console.log("Status:", status);

	// Get the error of the note slice
	const error = useSelector(selectNoteError);

	let content;
	// Conditionally render the content depending on the note slice state
	if (status === "loading") {
		content = <h2>Loading...</h2>;
	} else if (status === "succeeded") {
		if (allNotes.length === 0) {
			content = <p>You have no notes</p>;
		} else {
			content = (
				<div className="notes-container">
					<h2>My notes</h2>
					<div className="notes-grid-container">
						{allNotes?.map((note) => {
							let showTitle;
							let showDate;

							// Show only 20 character for the title
							if (note?.title?.length > 20) {
								showTitle = note?.title?.substring(0, 21) + "...";
							} else {
								showTitle = note?.title;
							}

							// Current date format : 2024-12-19T02:30:21.974Z
							// Display only in format of: DD-MM-YYYY
							const onlyDate = note?.updatedAt?.split("T")[0];
							const splittedDate = onlyDate?.split("-");
							const day = splittedDate[2];
							const month = splittedDate[1];
							const year = splittedDate[0];
							showDate = `${day}/${month}/${year}`;

							return (
								<NoteItem
									key={note._id}
									note={note}
									showTitle={showTitle}
									showDate={showDate}
								/>
							);
						})}
					</div>
				</div>
			);
		}
	} else if (status === "failed") {
		content = <h2>{error}</h2>;
	}

	return content;
}

export default NotesList;
