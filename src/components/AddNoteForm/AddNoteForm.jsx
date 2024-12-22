import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "../../features/notes/notesSlice";
import "./AddNoteForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddNoteForm() {
	// Track title and content input state
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// State for error message
	const [errorMessage, setErrorMessage] = useState("");

	// Clear the error if user is filling in title or content input
	useEffect(() => {
		setErrorMessage("");
	}, [title, content]);

	// Boolean value to check if both fields are filled in
	const canCreate = Boolean(title) && Boolean(content);

	// Instantiate hook
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleAddNote() {
		if (canCreate) {
			try {
				// Dispatch async thunk to add a note
				dispatch(addNote({ title, text: content })).unwrap();

				// Clear the form
				setTitle("");
				setContent("");

				// Redirect user to the homepage (NotesList)
				navigate("/");
			} catch (error) {
				console.log(error);
				console.log(first);
			}
		} else {
			setErrorMessage("Both fields are required");
		}
	}

	return (
		<>
			<div className="add-form-container">
				<h1>Create a note</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();

						handleAddNote();
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
					<button className="add-icon">
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</form>
				{errorMessage && <p>{errorMessage}</p>}
			</div>
		</>
	);
}

export default AddNoteForm;
