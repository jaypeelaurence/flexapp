import React, { Component } from 'react';

import Card from './card';

import './style.scss';

export default class Listing extends Component {
	constructor(props){
		super(props);

		this.state = {
			load: null,
			feed: []
		}
	}

	request = async () => { // simulates fetch API request;
		let res;

		try{
			res = await require('./feed/data');

			return res;
		}catch(err){
			return err;
		}
	}

	fetchFeed = () => this.request()
	.then((res) => setTimeout(() => (
		this.setState({
			feed: res,
			load: 1
		})
	), 300))
	.catch(err => (
		this.setState({
			load: 2
		})
	))

	componentDidMount = () => {
		this.initial = this.fetchFeed();
	}

	componentWillUnmount = () => {
		this.initial = null;
	}

	render = () => (
		<div className={["container", "listing", this.state.load ? "loaded" : "unloaded"].join(" ")}>
			{
				this.state.load === 2 ? 
				<div className={"centered"}>
					<h1 className={"heading"}>
						No feeds avaiable.
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