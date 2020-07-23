import React from "react"

function CreatePassword({ createPassword }) {
	let password1, password2

	function validatePassword() {
		if (password1.value && password2.value) {
			if (password1.value === password2.value) {
				if (password1.value.length >= 5 && password1.value.length <= 10) {
					createPassword(password1.value)
				} else alert("Password must be between 5 and 10 characters long")
			} else alert("Passwords do not match")
		} else if (password1.value) {
			document.getElementById("pswrdInput2").placeholder =
				"*confirmation required"
		} else if (password2.value) {
			document.getElementById("pswrdInput1").placeholder = "*password required"
		} else {
			document.getElementById("pswrdInput1").placeholder = "*password required"
			document.getElementById("pswrdInput2").placeholder =
				"*confirmation required"
		}
	}

	function enterKeyCreatePassword(e) {
		if (e.key === "Enter") {
			validatePassword()
		}
	}

	function exitCreatePassword() {
		createPassword()
	}

	return (
		<div className="createPasswordWindow">
			<div className="passwordInputContainer">
				<div className="exitPasswordWindowContainer">
					<i
						className="fa fa-remove exitPasswordWindowIcon"
						onClick={exitCreatePassword}
					/>
				</div>
				<div className="createPasswordText font">Create Password</div>
				<div className="passwordWarningText font">
					(this password will be used for all notes)
				</div>

				<input
					autoFocus
					id="pswrdInput1"
					className="passwordInput"
					type="password"
					placeholder="password"
					ref={(input) => (password1 = input)}
				></input>
				<input
					id="pswrdInput2"
					className="passwordInput"
					type="password"
					placeholder="confirm password"
					ref={(input) => (password2 = input)}
					onKeyDown={enterKeyCreatePassword}
				></input>
				<button className="savePasswordButton font" onClick={validatePassword}>
					Save
				</button>
			</div>
		</div>
	)
}

export default CreatePassword
