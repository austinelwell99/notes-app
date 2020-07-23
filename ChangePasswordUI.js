import React from "react"

function ChangePasswordUI({ oldPassword, storeNewPassword }) {
	let newPassword1, newPassword2, oldPasswordAttempt

	function validateNewPassword() {
		if (oldPasswordAttempt.value && newPassword1.value && newPassword2.value) {
			if (oldPassword === oldPasswordAttempt.value) {
				if (newPassword1.value === newPassword2.value) {
					if (newPassword1.value !== oldPassword) {
						if (
							newPassword1.value.length >= 5 &&
							newPassword1.value.length <= 10
						) {
							storeNewPassword(newPassword1.value)
						} else {
							alert("Password must be between 5 and 10 characters long")
							document.getElementById("newPasswordInput1").value = ""
							document.getElementById("newPasswordInput2").value = ""
						}
					} else {
						alert("New password cannot match previous password")
						document.getElementById("newPasswordInput1").value = ""
						document.getElementById("newPasswordInput2").value = ""
					}
				} else {
					alert("New passwords do not match")
					document.getElementById("newPasswordInput1").value = ""
					document.getElementById("newPasswordInput2").value = ""
				}
			} else {
				alert("Old password is incorrect")
				document.getElementById("oldPasswordInput").value = ""
			}
		}
		if (!oldPasswordAttempt.value) {
			document.getElementById("oldPasswordInput").value = ""
			document.getElementById("oldPasswordInput").placeholder =
				"*old password required"
		}
		if (!newPassword1.value) {
			document.getElementById("newPasswordInput1").value = ""
			document.getElementById("newPasswordInput1").placeholder =
				"*password required"
		}
		if (!newPassword2.value) {
			document.getElementById("newPasswordInput2").value = ""
			document.getElementById("newPasswordInput2").placeholder =
				"*confirmation required"
		}
	}

	function enterKeyChangePassword(e) {
		if (e.key === "Enter") {
			validateNewPassword()
		}
	}

	function exitChangePassword() {
		storeNewPassword()
	}

	return (
		<div>
			<div className="createPasswordWindow">
				<div className="passwordInputContainer">
					<div className="exitPasswordWindowContainer">
						<i
							className="fa fa-remove exitPasswordWindowIcon"
							onClick={exitChangePassword}
						/>
					</div>
					<div className="changePasswordText font">Change Password</div>
					<div className="passwordWarningText font">
						(new password will be used for all notes)
					</div>

					<input
						autoFocus
						id="oldPasswordInput"
						className="oldPassword"
						type="password"
						placeholder="old password"
						ref={(input) => (oldPasswordAttempt = input)}
					></input>
					<input
						id="newPasswordInput1"
						className="passwordInput"
						type="password"
						placeholder="new password"
						ref={(input) => (newPassword1 = input)}
					></input>
					<input
						id="newPasswordInput2"
						className="passwordInput"
						type="password"
						placeholder="confirm new password"
						ref={(input) => (newPassword2 = input)}
						onKeyDown={enterKeyChangePassword}
					></input>
					<button
						className="savePasswordButton font"
						onClick={validateNewPassword}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}

export default ChangePasswordUI
