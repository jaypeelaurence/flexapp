import React, { useState, useEffect } from 'react';

import './style.scss';

const Error = () => {
	const [state, setState] = useState({
		load: null
	});

	useEffect(() => {
		setState({load: 1})

		return () => setState({load: null});
	}, [])

	return (
		<div className={["container", "errorPage", state.load ? "loaded" : "unloaded"].join(" ")}>
			<h1 className={"heading"}>
				Error: <span>Page not found.</span>
			</h1>
		</div>
	)
}

export default Error;