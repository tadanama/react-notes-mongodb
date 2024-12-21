import React, { useState } from "react";
import "./EditNoteForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function EditNoteForm() {
	// Track title and content input state
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	return (
		<>
			<div className="edit-form-container">
				<h1>Edit a note</h1>
				<form>
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
			</div>
		</>
	);
}

export default EditNoteForm;
