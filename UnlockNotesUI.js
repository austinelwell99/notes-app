import React from "react"

function UnlockNotesUI({ unlockNotes, password }) {
	let passwordAttempt
	let shakingFlag = false

	function validateUnlock() {
		if (passwordAttempt.value) {
			if (passwordAttempt.value === password) {
				unlockNotes("valid")
			} else {
				passwordAttempt.value = ""
				passwordAttempt.placeholder = "*incorrect password"
				shakingFlag = true
				document
					.getElementById("unlockingInputContainer")
					.classList.add("animate__shakeX")
				setTimeout(() => {
					shakingFlag = false
					document
						.getElementById("unlockingInputContainer")
						.classList.remove("animate__shakeX")
				}, 1400)
			}
		} else {
			passwordAttempt.placeholder = "*input required"
		}
	}

	function enterKeySubmit(e) {
		if (e.key === "Enter") {
			validateUnlock()
		}
	}

	function exitUnlockPassword() {
		if (!shakingFlag) {
			unlockNotes("cancel")
		}
	}

	return (
		<div className="unlockingWindow">
			<div id="unlockingInputContainer" className="animate__animated">
				<div className="exitUnlockWindowContainer">
					<i
						className="fa fa-remove exitUnlockWindowIcon"
						onClick={exitUnlockPassword}
					/>
				</div>
				<div className="unlockText font">Unlock All Notes</div>
				<input
					autoFocus
					id="unlockPasswordInput"
					type="password"
					placeholder="password"
					ref={(input) => (passwordAttempt = input)}
					onKeyDown={enterKeySubmit}
				></input>
				<button className="unlockButton font" onClick={validateUnlock}>
					Unlock
				</button>
			</div>
		</div>
	)
}

export default UnlockNotesUI
