import React, { Component } from 'react';

import Card from './card';

import './style.scss';

export default class Listing extends Component {
	constructor(props){
		super(props);

		this.state = {
			load: null,
			feed: [],
			status: null
		}
	}

	request = async () => {
		let res;

		res = await require('./feed/data'); // simulates fetch API request;

		if(res.err) throw new Error("something is wrong..."); // if api has an error response.

		return res;
	}

	componentDidMount = () => {
		this.initial = this.request()
		.then(res => setTimeout(() => (
			this.setState({
				feed: res,
				load: res.length ? 1 : 2,
				status: res.length ? null : "no feeds available..."
			})
		), 300))
		.catch(err => (
			this.setState({
				load: 2,
				status: err.message
			})
		))
	}

	componentWillUnmount = () => {
		this.initial = null;
	}

	render = () => (
		<div className={["container", "listing", this.state.load ? "loaded" : "unloaded"].join(" ")}>
			{
				!this.state.load ? null : this.state.load === 2 ? 
				<div className={"centered"}>
					<h1 className={"heading"}>
						{
							!this.state.status ? null : this.state.status
						}
					</h1>
				</div> : 
				<div className={"row"}>
					{
						this.state.feed.map((feed, key) => 
							<div key={key} className={["col-md-6"].join(" ")}>
								<Card {...feed} />
							</div>
						)
					}
				</div>
			}
		</div>
	)
}