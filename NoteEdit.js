import React, { useEffect } from "react"

function NoteEdit({ addNote, deleteNote, activeNoteBuffer, updateNote }) {
	//--------------------------------------------------------------------------onload vars and useEffect--------------

	let title, tags, body, color, newColor, locked

	useEffect(() => {
		title.value = activeNoteBuffer.title
		tags.value = activeNoteBuffer.tags
		body.value = activeNoteBuffer.body
		color = activeNoteBuffer.color
		locked = activeNoteBuffer.locked
		//--------------------------------------------------------adding the white border to currently selected color
		if (color === "#71c0e4") {
			document.getElementById("colorDefault").classList.add("selectedColor")
			document.getElementById("colorTan").classList.add("nonSelectedColor")
			document.getElementById("colorPink").classList.add("nonSelectedColor")
			document.getElementById("colorGreen").classList.add("nonSelectedColor")
		}
		if (color === "#fae483") {
			document.getElementById("colorDefault").classList.add("nonSelectedColor")
			document.getElementById("colorTan").classList.add("selectedColor")
			document.getElementById("colorPink").classList.add("nonSelectedColor")
			document.getElementById("colorGreen").classList.add("nonSelectedColor")
		}
		if (color === "#ff9df2") {
			document.getElementById("colorDefault").classList.add("nonSelectedColor")
			document.getElementById("colorTan").classList.add("nonSelectedColor")
			document.getElementById("colorPink").classList.add("selectedColor")
			document.getElementById("colorGreen").classList.add("nonSelectedColor")
		}
		if (color === "#c0ff85") {
			document.getElementById("colorDefault").classList.add("nonSelectedColor")
			document.getElementById("colorTan").classList.add("nonSelectedColor")
			document.getElementById("colorPink").classList.add("nonSelectedColor")
			document.getElementById("colorGreen").classList.add("selectedColor")
		}
	}, [])

	//---------------------------------------------------------------------------------------------methods-------------
	//changeColor
	//saveNewNote

	function changeColor(colorIn) {
		newColor = colorIn //important: creating new binding to set color attribute to
		//------------------------------------adding the white border to new color selction and removing it from prev
		if (colorIn === "#71c0e4") {
			document
				.getElementById("colorDefault")
				.classList.remove("nonSelectedColor")
			document.getElementById("colorDefault").classList.add("selectedColor")
			document.getElementById("colorTan").classList.add("nonSelectedColor")
			document.getElementById("colorPink").classList.add("nonSelectedColor")
			document.getElementById("colorGreen").classList.add("nonSelectedColor")
		}
		if (colorIn === "#fae483") {
			document.getElementById("colorTan").classList.remove("nonSelectedColor")
			document.getElementById("colorTan").classList.add("selectedColor")
			document.getElementById("colorDefault").classList.add("nonSelectedColor")
			document.getElementById("colorPink").classList.add("nonSelectedColor")
			document.getElementById("colorGreen").classList.add("nonSelectedColor")
		}
		if (colorIn === "#ff9df2") {
			document.getElementById("colorPink").classList.remove("nonSelectedColor")
			document.getElementById("colorPink").classList.add("selectedColor")
			document.getElementById("colorDefault").classList.add("nonSelectedColor")
			document.getElementById("colorTan").classList.add("nonSelectedColor")
			document.getElementById("colorGreen").classList.add("nonSelectedColor")
		}
		if (colorIn === "#c0ff85") {
			document.getElementById("colorGreen").classList.remove("nonSelectedColor")
			document.getElementById("colorGreen").classList.add("selectedColor")
			document.getElementById("colorDefault").classList.add("nonSelectedColor")
			document.getElementById("colorTan").classList.add("nonSelectedColor")
			document.getElementById("colorPink").classList.add("nonSelectedColor")
		}
	}

	function saveNewNote(e) {
		e.preventDefault()

		if (title.value && body.value) {
			if (
				title.value !== activeNoteBuffer.title ||
				tags.value !== activeNoteBuffer.tags ||
				body.value !== activeNoteBuffer.body
			) {
				let currentNote = {
					id: activeNoteBuffer.id,
					title: title.value,
					tags: tags.value,
					body: body.value,
					date: new Date().toString().slice(0, 15),
					color: newColor || color,
					locked: activeNoteBuffer.locked //same as currentNote.id, simply keeps the value that came in
				}

				title.value = ""
				tags.value = ""
				body.value = ""

				document.getElementById("titleInput").placeholder = "title"
				document.getElementById("bodyInput").placeholder = "body"

				deleteNote(currentNote)
				addNote(currentNote)

				document.getElementById("notesWindow").scrollTo(0, 0)
			} else if (newColor && newColor !== color) {
				updateNote(newColor)
			} else deleteNote() //so you can 'save' the note without changes and it will exit the window
		}
		//------------------------------------------------------------------------------required field enforcement-----
		else if (title.value)
			document.getElementById("bodyInput").placeholder = "*body required"
		else if (body.value)
			document.getElementById("titleInput").placeholder = "*title required"
		else {
			document.getElementById("bodyInput").placeholder = "*body required"
			document.getElementById("titleInput").placeholder = "*title required"
		}
	}

	//------------------------------------------------------------------------------------render-----------------------

	return (
		<div id="editWindow">
			<div id="colorMenu">
				<div id="colorDefault" onClick={() => changeColor("#71c0e4")}></div>
				<div id="colorTan" onClick={() => changeColor("#fae483")}></div>
				<div id="colorPink" onClick={() => changeColor("#ff9df2")}></div>
				<div id="colorGreen" onClick={() => changeColor("#c0ff85")}></div>
			</div>
			<form id="editInputContainer">
				<div id="editNoteText" className="font">
					Edit Note
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
				<div id="editButtons">
					<button id="editSaveButton" className="font" onClick={saveNewNote}>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}

export default NoteEdit
