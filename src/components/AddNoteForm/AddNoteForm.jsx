import React, { useState } from "react";
import "./AddNoteForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddNoteForm() {
	// Track title and content input state
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	return (
		<>
			<div className="add-form-container">
				<h1>Create a note</h1>
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
					<button className="add-icon">
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</form>
			</div>
		</>
	);
}

export default AddNoteForm;
