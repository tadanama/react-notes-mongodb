import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function NoteItem({ note }) {
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

	return (
		<div className="note-card">
			<h3>{showTitle}</h3>
			<p>{showText}</p>
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
