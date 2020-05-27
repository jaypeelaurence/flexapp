import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';

import Content from './content';

import './style.scss';

const Single = props => {
	const [state, setState] = useState({
		data: null,
		load: null,
		status: ""
	});

	const getImage = img => require('./img/' + img);

	const initial = async _ => {
		let res;

		if(!state.load){
			let feed = await require('./feed/data'); // simulates fetch API request;

			if(feed.err) throw new Error("something is wrong..."); // if api has an error response.

			feed = feed.map(data => ({
				...data,
				image: getImage(data.image)
			})).filter(data => data.slug === props.match.params.slug);

			if(!feed.length){
				throw new Error("no feeds available..."); // if api has an error response.
			}

			if(feed.length >= 2){
				throw new Error("something is wrong..."); // if api has an error response.
			}

			res = feed[0];
		}

		return res;
	}

	useEffect(() => {
		initial()
		.then(res => !res ? null : setState({
			...state,
			data: res,
			load: 1
		})).catch(err => setState({
			load: 2,
			status: err.message
		}))
	})

	return (
		<div className={["container", "single", state.load ? "loaded" : "unloaded"].join(" ")}>
			{
				!state.load ? null : 
				state.load === 2 ? 
				<div className={"centered"}>
					<h1 className={"heading"}>
						{
							!state.status ? null : state.status
						}
					</h1>
				</div> : 
				<div>
					<Helmet title={`ADRENALIN - ${state.data.title}`} />
					<Content data={state.data} />
				</div>
			}
		</div>
	)
}

export default Single;


