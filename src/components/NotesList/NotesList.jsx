import React, { useContext } from "react";
import { SearchContext } from "../../App";
import "./NotesList.css";
import { useSelector } from "react-redux";
import { Link, renderMatches } from "react-router-dom";
import {
	selectAllNotes,
	selectNoteError,
	selectNoteStatus,
} from "../../features/notes/notesSlice";
import NoteCard from "./NoteCard";

function NotesList() {
	// Get search state from the SearchContext with useContext
	const { search } = useContext(SearchContext);

	// Get all notes from the redux store
	const allNotes = useSelector(selectAllNotes);
	// console.log("Inside NoteList component");
	// console.log(allNotes);

	// Get the status of the note slice
	const status = useSelector(selectNoteStatus);
	// console.log("Status:", status);

	// Get the error of the note slice
	const error = useSelector(selectNoteError);

	let content;
	// Conditionally render the content depending on the note slice state
	if (status === "loading") {
		content = <h2>Loading...</h2>;
	} else if (status === "succeeded") {
		if (allNotes.length === 0) {
			content = (
				<h2 className="message">
					You have no notes. <Link to={"/note"}>Create one</Link>
				</h2>
			);
		} else {
			// Sort the notes
			const sortedNote = allNotes
				?.slice()
				.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

			if (search) {
				const filteredNote = sortedNote.filter((note) =>
					note.title.toLowerCase().includes(search.toLowerCase())
				);

				if (filteredNote.length === 0) {
					content = <h2 className="message">No items matched.</h2>;
				} else {
					console.log(filteredNote);
					content = (
						<div className="notes-container">
							<h2>My notes</h2>
							<div className="notes-grid-container">
								{filteredNote.map((matchedNote) => (
									<Link to={`/note/${matchedNote._id}`} key={matchedNote._id}>
										<NoteCard note={matchedNote} />
									</Link>
								))}
							</div>
						</div>
					);
				}
			} else {
				content = (
					<div className="notes-container">
						<h2>My notes</h2>
						<div className="notes-grid-container">
							{sortedNote?.map((note) => {
								return (
									<Link to={`/note/${note._id}`} key={note._id}>
										<NoteCard note={note} />
									</Link>
								);
							})}
						</div>
					</div>
				);
			}
		}
	} else if (status === "failed") {
		content = <h2>{error}</h2>;
	}

	return content;
}

export default NotesList;
