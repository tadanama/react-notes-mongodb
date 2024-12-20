import React from "react";
import "./AddNoteForm.css"

function AddNoteForm() {
	return (
		<>
			<div className="form-container">
				<h1>Create a note</h1>
				<form>
					<input type="text" name="title" placeholder="Title" />
					<br />
					<textarea placeholder="Content" />
				</form>
			</div>
		</>
	);
}

export default AddNoteForm;
