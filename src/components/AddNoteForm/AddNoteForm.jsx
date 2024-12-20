import React from "react";
import "./AddNoteForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddNoteForm() {
	return (
		<>
			<div className="form-container">
				<h1>Create a note</h1>
				<form>
					<input type="text" name="title" placeholder="Title" />
					<br />
					<textarea placeholder="Content" />
					<button className="add-icon">
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</form>
			</div>
		</>
	);
}

export default AddNoteForm;
