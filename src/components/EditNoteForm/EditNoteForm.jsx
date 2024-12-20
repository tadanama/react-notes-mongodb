import React from "react";
import "./EditNoteForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function EditNoteForm() {
	return (
		<>
			<div className="edit-form-container">
				<h1>Edit a note</h1>
				<form>
					<input type="text" name="title" placeholder="Title" />
					<br />
					<textarea placeholder="Content" />
					<button className="save-icon">
						<FontAwesomeIcon icon={faFloppyDisk} />
					</button>
				</form>
			</div>
		</>
	);
}

export default EditNoteForm;
