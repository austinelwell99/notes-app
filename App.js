import React, { useState, useEffect } from "react"
import "./App.css"
import NoteIn from "./NoteIn"
import NoteEdit from "./NoteEdit"
import Welcome from "./Welcome"
import NoResults from "./Noresults"
import CreatePassword from "./CreatePassword"
import UnlockNotesUI from "./UnlockNotesUI"
import ChangePasswordUI from "./ChangePasswordUI"

//--------------------------------------------------------------------------------------------global vars--------------

//--general
let password,
	searchWanted,
	activeLockingNote,
	activeNoteBuffer = {},
	activeSearchFilter = "title"

//--arrays
let backupState = [],
	tempState1 = [],
	titleMatches = [],
	tagMatches = [],
	bodyMatches = [],
	allMatches = [],
	editedSearchState = [],
	editedSearchStateIDs = [],
	backupStateIDs = [],
	searchResultsArr = [],
	arrPriorityNotes = []

//--flags
let editFlag = false,
	emptyFlag = true,
	passwordExists = false,
	createPasswordFlag = false,
	globalLockFlag = true,
	unlockingFlag = false,
	changePasswordFlag = false,
	activeSearchFlag = false

function App() {
	//---------------------------------------------------------------------------------------state & local vars--------
	const [state, setState] = useState([])

	let deleteFlag = false //this will automatically reset since it is inside the function.

	//----------------------------------------------------------------------------------------storage------------------
	useEffect(() => {
		setState(JSON.parse(localStorage.getItem("myNotesInLocalStorage")) || [])
		password = JSON.parse(localStorage.getItem("passwordStorage"))
		if (password) {
			passwordExists = true
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("myNotesInLocalStorage", JSON.stringify(state))
		lockAllNotes()
	}, [state])

	//-----------------------------------------------------------------------------------------methods-----------------
	//conditional for welcome message
	//addNote
	//deleteNote
	//scrollToNote
	//editNote
	//lockNote
	//lockAllNotes
	//unlockNotes
	//permUnlockNote
	//createPassword
	//openChangePasswordUI
	//storeNewPassword
	//updateNote
	//mergeSearchEdits
	//convertDate
	//enterKeySearch
	//searchForNote
	//resetSearch

	state.length == 0 ? (emptyFlag = true) : (emptyFlag = false)

	function addNote(newNoteIn) {
		setState((state) => [newNoteIn, ...state])
	}

	function deleteNote(note) {
		deleteFlag = true
		editFlag = false
		if (note && note.locked !== "locked") {
			//for use in clearing edit window when no changes have been made
			for (let i = 0; i < state.length; i++) {
				if (state[i].id === note.id)
					setState(state.filter((e) => e.id !== note.id))
			}
		} else if (note && note.locked === "locked") {
			alert("Note is locked")
			setState([...state])
		} else {
			setState([...state])
		}
	}

	function scrollToNote(note) {
		if (!deleteFlag) {
			document.getElementById(note.id).scrollIntoView()
			document.getElementById(note.id).classList.add("highlight")
			setTimeout(() => {
				if (!deleteFlag)
					document.getElementById(note.id).classList.remove("highlight")
			}, 2000)
		}
	}

	function editNote(note) {
		if (note.locked !== "locked") {
			activeNoteBuffer = note
			editFlag = true
			setState([...state])
		} else alert("Note is locked")
	}

	function lockNote(note) {
		if (note.locked == "unlocked") {
			createPasswordFlag = true
			globalLockFlag = true
			activeLockingNote = note
			//if password needs to be created, 'activeLockingNote' lets the program remember to lock this note afterwards
			if (passwordExists) {
				note.locked = "locked"
				lockAllNotes()
			}
		} else if (note.locked === "lockedOpen") {
			globalLockFlag = true
		} else if (note.locked === "locked") {
			unlockingFlag = true
		}
		setState([...state])
	}

	function lockAllNotes() {
		if (globalLockFlag) {
			for (let i = 0; i < state.length; i++) {
				if (state[i].locked !== "unlocked") {
					//--------------------------------------------------adding background stripe effect and body blur
					document.getElementById(state[i].id).classList.add("lockBlur")
					document
						.getElementById("noteBody" + state[i].id)
						.classList.add("blur")
					//--------also adding stripe effect to title display
					document
						.getElementById("title" + state[i].id)
						.classList.add("lockBlur")
					//--------------------------------------------------turn off visibility for the perm unlock icon
					if (state[i].locked === "lockedOpen") {
						document
							.getElementById("removeUnlockIcon1" + state[i].id)
							.classList.add("hideUnlock")
						document
							.getElementById("removeUnlockIcon2" + state[i].id)
							.classList.add("hideUnlock")
						//---------------------------------------------removing lockedOpen bkg effect from body and title
						document
							.getElementById(state[i].id)
							.classList.remove("lockOpenBackground")
						document
							.getElementById("title" + state[i].id)
							.classList.remove("lockOpenBackground")
					}
					//-----------------------------change states to locked
					state[i].locked = "locked"
				}
			}
		}
	}

	function unlockNotes(input) {
		//---------------------------------------secondary function: exit 'unlock notes' window
		if (input === "cancel") {
			unlockingFlag = false
			globalLockFlag = true
			//-----------------------------------main function: unlock all notes
		} else if (input === "valid") {
			unlockingFlag = false
			globalLockFlag = false

			for (let i = 0; i < state.length; i++) {
				if (state[i].locked == "locked") {
					//----------------------------------------------------looping through state and unlocking notes
					document.getElementById(state[i].id).classList.remove("lockBlur")
					document
						.getElementById("noteBody" + state[i].id)
						.classList.remove("blur")
					document
						.getElementById(state[i].id)
						.classList.add("lockOpenBackground")
					//--------repeating above for the title display
					document
						.getElementById("title" + state[i].id)
						.classList.remove("lockBlur")
					document
						.getElementById("title" + state[i].id)
						.classList.add("lockOpenBackground")

					state[i].locked = "lockedOpen"
					//-----------------------------------------------turning on visibility for the perm unlock icon
					document
						.getElementById("removeUnlockIcon1" + state[i].id)
						.classList.remove("hideUnlock")
					document
						.getElementById("removeUnlockIcon2" + state[i].id)
						.classList.remove("hideUnlock")
				}
			}
		}
		setState([...state])
	}

	function permUnlockNote(note) {
		//--------------------------for changing a locked note back to unlocked permanently
		note.locked = "unlocked"
		document
			.getElementById("removeUnlockIcon1" + note.id)
			.classList.add("hideUnlock")
		document
			.getElementById("removeUnlockIcon2" + note.id)
			.classList.add("hideUnlock")
		document.getElementById(note.id).classList.remove("lockOpenBackground")
		//--------repeating above for title display
		document
			.getElementById("title" + note.id)
			.classList.remove("lockOpenBackground")

		setState([...state])
	}

	function createPassword(passwordIn) {
		if (passwordIn) {
			passwordExists = true
			password = passwordIn
			localStorage.setItem("passwordStorage", JSON.stringify(password))
			//-------------------------------------------------------goes back and locks the note from first click
			activeLockingNote.locked = "locked"
			lockAllNotes()
		} else {
			//---------------------used to dismiss the password creator by hitting the cancel button
			createPasswordFlag = false
		}
		setState([...state])
	}

	function openChangePasswordUI() {
		changePasswordFlag = true
		if (!passwordExists) {
			alert("Create password by locking a note")
		}
		setState([...state])
	}

	function storeNewPassword(newPasswordIn) {
		changePasswordFlag = false
		if (newPasswordIn) {
			password = newPasswordIn
			localStorage.setItem("passwordStorage", JSON.stringify(password))
		}
		setState([...state])
	}

	function updateNote(newColor) {
		editFlag = false
		activeNoteBuffer.color = newColor
		setState([...state])
	}

	function mergeSearchEdits() {
		//called in searchForNote and resetNote
		editedSearchState = [...state] //all the currently displayed notes, updated when edits were made
		editedSearchStateIDs = editedSearchState.map((n) => n.id)
		backupStateIDs = backupState.map((n) => n.id)

		searchResultsArr.forEach(findDeleted)

		function findDeleted(note) {
			//if the current state does not have a note that was in the search result (was deleted during search)...
			if (!editedSearchStateIDs.includes(note.id)) {
				backupState = backupState.filter((n) => n.id !== note.id) //then remove from backup state
			}
		}
		editedSearchStateIDs.forEach(replaceNote)
		function replaceNote(searchedNoteID) {
			//replaces all of the notes in the original search result with current state to preserve any edits
			let searchedNotePtr = editedSearchStateIDs.indexOf(searchedNoteID)

			if (!backupStateIDs.includes(searchedNoteID)) {
				//if a new note was added, push it to a temp arr, to be added to the state later
				arrPriorityNotes.push(editedSearchState[searchedNotePtr])
			} else {
				let backupPtr = backupStateIDs.indexOf(searchedNoteID) //getting index of each note...

				if (editedSearchState[searchedNotePtr] !== backupState[backupPtr]) {
					//if the current note does not deeply equal the note in backup, meaning it has been edited
					arrPriorityNotes.push(editedSearchState[searchedNotePtr]) //it will push it to the top
					backupState.splice(backupPtr, 1) //and remove it from both the backup state...
					backupStateIDs.splice(backupPtr, 1) //and the array of backup IDs
				}
			}
		}
		backupState = [...arrPriorityNotes, ...backupState] //adding any new notes to the front
		arrPriorityNotes = []
	}

	function convertDate(dateStringIn) {
		let dateElements = dateStringIn.split(" ")
		let output
		let day, month, year
		let dateItemsCount = 0
		let invalidFlag = false

		console.log("dateElements:", dateElements)

		if (dateElements.length > 3) invalidFlag = true

		let regexMonth = /^(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|june?|july?|aug(ust)?|sep(tember)?|oct(ober)?|nov(ember)?|dec(ember)?)$/i

		let regexDay = /^\d\d?$/

		let regexYear = /^\d\d\d\d$/

		dateElements.forEach(matchDateParts)

		function matchDateParts(datePart) {
			datePart = datePart.trim()
			if (!month) {
				if (regexMonth.test(datePart)) {
					month = datePart.slice(0, 3).toLowerCase()
					month = month.replace(/^\w/, month.charAt(0).toUpperCase())
					console.log("month:", month)
				}
			}
			if (!year) {
				if (regexYear.test(datePart)) {
					year = datePart
					console.log("year:", year)
				}
			}
			if (!day) {
				if (regexDay.test(datePart)) {
					day = datePart
					if (day.length === 1) {
						day = "0" + day
					}
					console.log("day:", day)
				}
			}
		}

		if (!month && !year) {
			invalidFlag = true
		} else if (!month && day && year) {
			invalidFlag = true
		} else if (!month) {
			output = year
		} else if (!year && !day) {
			output = month
		} else if (!year) {
			output = month + " " + day
		} else if (!day) {
			output = [month, year]
		} else if (month && day && year) {
			output = month + " " + day + " " + year
		}
		console.log("output:", output)

		if (month) dateItemsCount++
		if (day) dateItemsCount++
		if (year) dateItemsCount++

		if (dateItemsCount !== dateElements.length) {
			invalidFlag = true
		}

		if (invalidFlag) return "invalid"
		else return output
	}

	function enterKeySearch(e) {
		if (e.key === "Enter") {
			searchForNote()
		}
	}

	function searchForNote() {
		if (searchWanted.value && activeSearchFilter) {
			if (activeSearchFlag === true) {
				mergeSearchEdits()
				tempState1 = [...backupState]
			} else {
				backupState = [...state]
				tempState1 = [...state] //state used to filter search input
				activeSearchFlag = true
			}
			if (activeSearchFilter === "title") {
				searchResultsArr = tempState1.filter((note) =>
					note.title.toLowerCase().includes(searchWanted.value.toLowerCase())
				)
			}
			if (activeSearchFilter === "tags") {
				searchResultsArr = tempState1.filter((note) =>
					note.tags.toLowerCase().includes(searchWanted.value.toLowerCase())
				)
			}
			if (activeSearchFilter === "body") {
				searchResultsArr = tempState1.filter((note) =>
					note.body.toLowerCase().includes(searchWanted.value.toLowerCase())
				)
			}
			if (activeSearchFilter === "all") {
				titleMatches = tempState1.filter((note) =>
					note.title.toLowerCase().includes(searchWanted.value.toLowerCase())
				)
				tagMatches = tempState1.filter((note) =>
					note.tags.toLowerCase().includes(searchWanted.value.toLowerCase())
				)
				bodyMatches = tempState1.filter((note) =>
					note.body.toLowerCase().includes(searchWanted.value.toLowerCase())
				)
				allMatches = [...titleMatches, ...tagMatches, ...bodyMatches]

				let uniqueNotesSet = new Set()

				allMatches.forEach((note) => {
					uniqueNotesSet.add(note)
				})

				searchResultsArr = [...uniqueNotesSet]
			}

			if (activeSearchFilter === "date") {
				let convertedDateString = convertDate(searchWanted.value)
				if (convertedDateString === "invalid") {
					searchWanted.value = ""
					searchWanted.placeholder = "*invalid date format"
					alert(
						"Invalid format.   Acceptable formats are:\n\n'september 17 1999'\n\n'jan 2020'\n\n'november'"
					)
				} else if (typeof convertedDateString === "object") {
					//----------------------------------------------in case it was given the month and year only
					let filter1 = tempState1.filter((note) =>
						note.date.includes(convertedDateString[0])
					)
					console.log("filter 1 passed")

					searchResultsArr = filter1.filter((note) =>
						note.date.includes(convertedDateString[1])
					)
				} else {
					searchResultsArr = tempState1.filter((note) =>
						note.date.includes(convertedDateString)
					)
				}
			}
			setState(searchResultsArr)
		} else searchWanted.placeholder = "*input required"
	}

	function resetSearch() {
		//setState([]) //for resetting easily while coding
		if (activeSearchFlag === true) {
			mergeSearchEdits()
			setState(backupState)
			searchWanted.value = ""
			searchWanted.placeholder = "search"
			activeSearchFlag = false
		} else {
			searchWanted.value = ""
			searchWanted.placeholder = "search"
		}
	}

	//---------------------------------------------------------------------------------------render--------------------

	return (
		<div className="entireContainer">
			{/*--------------------whole window renders triggered by flags*/}
			{editFlag && (
				<NoteEdit
					addNote={addNote}
					deleteNote={deleteNote}
					activeNoteBuffer={activeNoteBuffer}
					updateNote={updateNote}
				/>
			)}
			{createPasswordFlag && !passwordExists && (
				<CreatePassword createPassword={createPassword} />
			)}
			{changePasswordFlag && passwordExists && (
				<ChangePasswordUI
					storeNewPassword={storeNewPassword}
					oldPassword={password}
				/>
			)}
			{/*----------------------------------------------------------*/}

			<div className="allNonInput">
				<div className="titleAndSearch">
					<div className="searchWindow">
						{/*------------------------------------------------------------------ search UI */}

						<div className="searchBarContainer">
							<input
								className="searchBar font"
								placeholder="search"
								ref={(input) => (searchWanted = input)}
								onKeyDown={enterKeySearch}
							></input>
							<i
								className="fa fa-remove deleteIconSearch"
								onClick={() => resetSearch()}
							></i>
							<i
								className="fa fa-search searchIcon"
								onClick={() => searchForNote()}
							></i>
						</div>
						<form className="searchFilterContainer font">
							<label>
								<input
									type="radio"
									name="filter"
									value="title"
									defaultChecked
									onClick={() => (activeSearchFilter = "title")}
									className="searchFilterButton"
								></input>
								<span className="searchFilterText">title</span>
							</label>
							<label>
								<input
									type="radio"
									name="filter"
									value="tags"
									onClick={() => (activeSearchFilter = "tags")}
									className="searchFilterButton"
								></input>
								<span className="searchFilterText">tags</span>
							</label>
							<label>
								<input
									type="radio"
									name="filter"
									value="body"
									onClick={() => (activeSearchFilter = "body")}
									className="searchFilterButton"
								></input>
								<span className="searchFilterText">body</span>
							</label>
							<label>
								<input
									type="radio"
									name="filter"
									value="date"
									onClick={() => (activeSearchFilter = "date")}
									className="searchFilterButton"
								></input>
								<span className="searchFilterText">date</span>
							</label>
							<label>
								<input
									type="radio"
									name="filter"
									value="all"
									onClick={() => (activeSearchFilter = "all")}
									className="searchFilterButton"
								></input>
								<span className="searchFilterText">all</span>
							</label>
						</form>
					</div>

					{/*-------------------------------------------------------------- titles window UI*/}

					<div className="titlesWindow">
						{state.map((note) => (
							<div
								className="titleContent font"
								key={note.id}
								id={"title" + note.id}
								onClick={() => scrollToNote(note)}
								style={{ backgroundColor: note.color }}
							>
								<div>{note.title}</div>
								<div id="dateAndDelete">
									<div id="dateByTitle">{note.date}</div>
									<i
										className="fa fa-remove deleteIcon"
										onClick={() => deleteNote(note)}
									></i>
								</div>
							</div>
						))}
					</div>
				</div>

				{/*--------------------------------------------------------------------- notes window UI*/}

				<div id="notesWindow">
					{emptyFlag && !activeSearchFlag && <Welcome />}
					{emptyFlag && activeSearchFlag && <NoResults />}
					{unlockingFlag && (
						<UnlockNotesUI unlockNotes={unlockNotes} password={password} />
					)}
					{state.map((note) => (
						<div
							className="noteContent"
							id={note.id}
							key={note.id}
							style={{ backgroundColor: note.color }}
						>
							<div className="noteHeading">
								<p id="noteDate" className="font">
									{note.date}
								</p>
								<div className="noteWindowIcons">
									<div
										id="removeUnlockIconContainer"
										onClick={() => permUnlockNote(note)}
									>
										<span
											id={"removeUnlockIcon1" + note.id}
											className="banIcon hideUnlock"
										>
											&#8725;
										</span>
										<i
											id={"removeUnlockIcon2" + note.id}
											className="fa fa-lock smallIcon hideUnlock"
										></i>
									</div>
									<i
										className="fa fa-lock lockIcon"
										onClick={() => lockNote(note)}
									/>
									<i
										className="fa fa-pencil editIcon"
										onClick={() => editNote(note)}
									/>
								</div>
							</div>
							<h1 id="noteTitle" className="font">
								{note.title}
							</h1>
							<div id={"noteBody" + note.id} className="font">
								{note.body.split("\n").map((k, i) => (
									<p key={i}>{k}</p>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			{/*------------------------------------------------------------new note and change password UI */}

			<NoteIn addNote={addNote} />

			<div className="changePasswordContainer">
				<button
					className="changePasswordButtonText"
					onClick={openChangePasswordUI}
				>
					Change Password
				</button>
			</div>
		</div>
	)
}

export default App
