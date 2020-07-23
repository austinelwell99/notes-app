import React from "react"

function Welcome() {
	return (
		<div className="welcomeMessage font">
			<div className="welcomeHeading">Welcome to the Notes App</div>
			<div className="welcomeBody">
				<div>Get started by adding a new note!</div>
				<i className="fa fa-long-arrow-right arrowIcon" />
			</div>
		</div>
	)
}

export default Welcome
