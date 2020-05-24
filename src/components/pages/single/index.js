import React, { Component } from 'react';

import Content from './content';

import './style.scss';

export default class Single extends Component {
	constructor(props){
		super(props);

		this.state = {
			load: null,
			feed: {},
			status: null
		}
	}

	request = async _ => {
		let res;

		res = await require('./feed/data').filter(data => data.slug === this.props.match.params.slug);  // simulates fetch API request;

		if(res.err) throw new Error("something is wrong..."); // if api has an error response.

		return res;
	}

	componentDidMount = _ => {
		this.initial = this.request()
		.then(res => setTimeout( _ => (
			this.setState({
				feed: res.length ? {
					...res[0],
					questions: res[0].questions.map((questions, key) => ({
						...questions,
						index: key + 1,
						date: new Date(questions.date).getTime()
					}))
				} : {},
				load: res.length ? 1 : 2,
				status: res.length ? null : "feed not found..."
			})
		), 300))
		.catch(err => (
			this.setState({
				load: 2,
				status: err.message
			})
		))
	}

	componentWillUnmount = _ => {
		this.initial = null;
	}

	render = () => (
		<div className={["container", "single", this.state.load ? "loaded" : "unloaded"].join(" ")}>
			{
				!this.state.load ? null : 
				this.state.load === 2 ? 
				<div className={"centered"}>
					<h1 className={"heading"}>
						{
							!this.state.status ? null : this.state.status
						}
					</h1>
				</div> : <Content {...this.state.feed} />
			}
		</div>
	)
}