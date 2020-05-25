import React, { useState, useEffect } from 'react';

import './style.scss';

const Error = () => {
	const [state, setState] = useState(false);

	const loadPage = _ => setState(true);

	useEffect(() => {
		loadPage();
	})

	return (
		<div className={["container", "errorPage", state ? "loaded" : "unloaded"].join(" ")}>
			<h1 className={"heading"}>
				Error: <span>Page not found.</span>
			</h1>
		</div>
	)
}

export default Error;