import React from 'react';

import { Link } from "react-router-dom";

import logo from "./img/adrenalin_blk.svg";

const Footer = () => {
	const navs = [
		{	
			name: "Privacy",
			path: "/privacy"
		},{	
			name: "Sitemap",
			path: "/sitemap"
		},{	
			name: "Facebook",
			path: "/facebook"
		},{	
			name: "LinkedIn",
			path: "/linkedIn"
		},{	
			name: "Instagram",
			path: "/instagram"
		},{	
			name: "Twitter",
			path: "/twitter"
		}
	];

	return (
		<footer>
			<div className={"container"}>
				<div>
					<Link className={"navbar-brand"} to={"/"}>
						<img src={logo} alt={"logo"}/>
					</Link>
					<ul className={"navbar-nav"}>
						{
							navs.map((nav, key) => (
								<li key={key} className={"nav-item"}>
									<Link className={"nav-link"} to={nav.path}>{nav.name}</Link>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		</footer>
	)
};

export { Footer };