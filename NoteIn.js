import React from "react"
import { v4 as uuidv4 } from "uuid"

function NoteIn({ addNote }) {
	let title, tags, body

	function submit(e) {
		e.preventDefault()
		if (title.value && body.value) {
			let currentNote = {
				id: uuidv4(),
				title: title.value,
				tags: tags.value,
				body: body.value,
				date: new Date().toString().slice(0, 15),
				color: "#71c0e4",
				locked: "unlocked"
			}

			title.value = ""
			tags.value = ""
			body.value = ""

			document.getElementById("titleInput").placeholder = "title"
			document.getElementById("bodyInput").placeholder = "body"

			addNote(currentNote)

			document.getElementById("notesWindow").scrollTo(0, 0)
		} else if (title.value)
			document.getElementById("bodyInput").placeholder = "*body required"
		else if (body.value)
			document.getElementById("titleInput").placeholder = "*title required"
		else {
			document.getElementById("bodyInput").placeholder = "*body required"
			document.getElementById("titleInput").placeholder = "*title required"
		}
	}

	return (
		<form id="inputContainer" onSubmit={submit}>
			<div id="newNoteText" className="font">
				New Note
			</div>
			<input
				id="titleInput"
				className="font"
				placeholder="title"
				ref={(input) => (title = input)}
			></input>
			<input
				id="tagsInput"
				className="font"
				placeholder="tags (optional)"
				ref={(input) => (tags = input)}
			></input>
			<textarea
				id="bodyInput"
				className="font"
				placeholder="body"
				ref={(input) => (body = input)}
			></textarea>
			<button id="addNoteButton" className="font">
				Add Note
			</button>
		</form>
	)
}

export default NoteIn
