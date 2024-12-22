import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function NoteItem({ note, showTitle, showDate }) {
	return (
		<div className="note-card">
			<h3>{showTitle}</h3>
			<p>{note.text}</p>
			<div className="bottom">
				<span>{showDate}</span>
				<button className="delete-icon">
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</div>
	);
}

export default NoteItem;
