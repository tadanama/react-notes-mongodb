import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllNotes, updateNote } from "../../features/notes/notesSlice";
import "./EditNoteForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function EditNoteForm() {
	// Get the id of the current note from the path parameter
	const { noteId } = useParams();
	// console.log(useParams());

	// State to display error message
	const [errorMessage, setErrorMessage] = useState("");

	// Instantiate hook
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get the note with the id from path parameter
	const notes = useSelector(selectAllNotes);
	const currentNote = notes.find((note) => note._id === noteId);

	// Track title and content input state
	const [title, setTitle] = useState(currentNote?.title);
	const [content, setContent] = useState(currentNote?.text);

	// Check if both input is filled in
	const canEdit = Boolean(title) && Boolean(content);

	function handleUpdateNote() {
		if (canEdit) {
			try {
				const updatedNote = {
					title,
					text: content,
					id: noteId,
				};
				// Dispatch async to update note to database
				dispatch(updateNote(updatedNote)).unwrap();

				// Clear input
				setTitle("");
				setContent("");

				// Redirect to homepage
				navigate("/react-notes-mongodb");
			} catch (error) {
				console.log(error);
			}
		} else {
			setErrorMessage("Both fields are required")
		}
	}

	return (
		<>
			<div className="edit-form-container">
				<h1>Edit a note</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();

						handleUpdateNote();
					}}
				>
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<br />
					<textarea
						placeholder="Content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<button className="save-icon">
						<FontAwesomeIcon icon={faFloppyDisk} />
					</button>
				</form>
				{errorMessage && <p>{errorMessage}</p>}
			</div>
		</>
	);
}

export default EditNoteForm;
