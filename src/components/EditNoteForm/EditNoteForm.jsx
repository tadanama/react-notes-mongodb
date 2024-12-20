import React from 'react'

function EditNoteForm() {
  return (
		<>
			<div className="form-container">
				<h1>Edit a note</h1>
				<form>
					<input type="text" name="title" placeholder="Title" />
					<br />
					<textarea placeholder="Content" />
				</form>
			</div>
		</>
	);
}

export default EditNoteForm