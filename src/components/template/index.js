import React from 'react';

import { Navbar } from './navbar';
import { Footer } from './footer';

import './style.scss';

const Template = props => (
	<div className={"wrapper"}>
		<Navbar/>
		<main className={["content", "mainContent"].join(" ")}>
			{props.children}
		</main>
		<Footer />
	</div>
);

export default Template;