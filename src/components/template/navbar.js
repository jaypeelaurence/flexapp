import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const Navbar = _ => {
	const [width, setWidth] = useState(window.innerWidth)

	const [state, setState] = useState({
		img: null,
		changed: false,
		load: null
	});

	const handleResize = _ => setWidth(window.innerWidth)
	
	const initialImage = (data = null) => {
		if(data && state.changed !== data.changed){
			if(data.load){
				setState({
					...state,
					load: 1
				})
			}

			setState({
				...state,
				img: data.img,
				changed: data.changed,
			})
		}
	}

	useEffect( _ => {
		window.addEventListener('resize', handleResize);

		if(!state.load){
			initialImage({
				img: require('./img/adrenalin_blk.svg'),
				changed: true,
				load: 1
			});
		}

		if(width <= 768){
			initialImage({
				img: require('./img/adrenalin.svg'),
				changed: state.change ? false : true
			});
		}

		return _ => ((
			window.removeEventListener('resize', handleResize),
			initialImage({img: './img', changed: false})
		));
	})

	const navs = [
		{	
			name: "Culture",
			path: "/culture"
		},{	
			name: "Work",
			path: "/work"
		},{	
			name: "Clients",
			path: "/clients"
		},{	
			name: "Services",
			path: "/services"
		},{	
			name: "Careers",
			path: "/careers"
		},{	
			name: "Contact",
			path: "/contact"
		}
	];

	return (
		<header>
			<div className={"container"}>
				<nav className={["navbar","navbar-expand-md", "navbar-light"].join(" ")}>
					<Link className={"navbar-brand"} to={"/"}>
						<img src={state.img} alt={"logo"}/> 
					</Link>
					<button className={"navbar-toggler"} type={"button"} data-toggle={"collapse"} data-target={"#navbarNavDropdown"} aria-controls={"navbarNavDropdown"} aria-expanded={"false"} aria-label={"Toggle navigation"}>
						<span className={"navbar-toggler-icon"}></span>
					</button>
					<div className={["collapse","navbar-collapse"].join(" ")} id={"navbarNavDropdown"}>
						<ul className={["navbar-nav", "ml-auto"].join(" ")}>
							{
								navs.map((nav, key) => (
									<li key={key} className={"nav-item"}>
										<Link className={"nav-link"} to={nav.path}>{nav.name}</Link>
									</li>
								))
							}
						</ul>
					</div>
				</nav>
			</div>
		</header>
	)
};

export { Navbar };