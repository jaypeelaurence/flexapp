import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';

import './style.scss';

const Error = _ => {
	const [state, setState] = useState(false);

	const loadPage = _ => setState(true);

	useEffect( _ => {
		loadPage();
	})

	return (
		<div className={["container", "errorPage", state ? "loaded" : "unloaded"].join(" ")}>
			<Helmet title={`ADRENALIN - Error`} />
			<h1 className={"heading"}>
				Error: <span>Page not found.</span>
			</h1>
		</div>
	)
}

export default Error;