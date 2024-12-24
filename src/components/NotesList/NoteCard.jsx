import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../../features/notes/notesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function NoteCard({ note }) {
	let showTitle;
	let showText;
	let showDate;

	// Show only 20 character for the title
	if (note?.title?.length > 20) {
		showTitle = note?.title?.substring(0, 21) + "...";
	} else {
		showTitle = note?.title;
	}

	// Show only 250 character for the note text
	if (note?.text?.length > 250) {
		showText = note?.text?.substring(0, 251) + "...";
	} else {
		showText = note?.text;
	}

	// Current date format : 2024-12-19T02:30:21.974Z
	// Display only in format of: DD-MM-YYYY
	const onlyDate = note?.updatedAt?.split("T")[0];
	const splittedDate = onlyDate?.split("-");
	const day = splittedDate[2];
	const month = splittedDate[1];
	const year = splittedDate[0];
	showDate = `${day}/${month}/${year}`;

	// Instantiate hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleDeleteNote(e) {
		e.preventDefault();	// Prevent the page from refreshing
		e.stopPropagation(); // Ensure that the parent link is not triggered when clicking the delete icon (chldren)
		// console.log("Delete icon is clicked");
		// console.log(e);

		try {
			// Dispatch delete async thunk
			dispatch(deleteNote(note._id));

			// Redirect back to homepage
			navigate("/react-notes-mongodb");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="note-card">
			<h3>{showTitle}</h3>
			<p>{showText}</p>
			<div className="bottom">
				<span>{showDate}</span>
				<button className="delete-icon" onClick={handleDeleteNote}>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</div>
	);
}

export default NoteCard;
