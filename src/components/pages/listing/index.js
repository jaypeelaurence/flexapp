import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';

import Card from './card';

import './style.scss';

const Listing = props => {
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

			if(!feed.length){
				throw new Error("no feeds available..."); // if api has an error response.
			}
		
			res = feed.map(data => ({
				...data,
				thumb: getImage(data.thumb)
			}))
		}

		return res
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
		<div className={["container", "listing", state.load ? "loaded" : "unloaded"].join(" ")}>
			<Helmet title={`ADRENALIN - Listing`} />
			{
				!state.load ? null : state.load === 2 ? 
				<div className={"centered"}>
					<h1 className={"heading"}>
						{
							!state.status ? null : state.status
						}
					</h1>
				</div> : 
				<div className={"row"}>
					{
						state.data.map((data, key) => 
							<div key={key} className={["col-md-6"].join(" ")}>
								<Card data={data} />
							</div>
						)
					}
				</div>
			}
		</div>
	)
}

export default Listing;