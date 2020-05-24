import React, { Component } from 'react';

import Content from './content';

import './style.scss';

export default class Single extends Component {
	constructor(props){
		super(props);

		this.state = {
			load: null,
			feed: {},
			sort: 0
		}
	}

	request = async () => { // simulates fetch API request;
		let res;

		try{
			res = await require('./feed/data').find(data => data.slug === this.props.match.params.slug);
		}catch(err){
			res = err;
		}

		return res;

	}

	fetchFeed = () => this.request()
	.then((res) => setTimeout(() => (
		this.setState({
			feed: res ? {
				...res,
				questions: res.questions.map((questions, key) => ({
					...questions,
					index: key + 1,
					date: new Date(questions.date).getTime()
				}))
			} : {},
			load: res ? 1 : 2
		})
	), 300))
	.catch(err => (
		this.setState({
			load: 2
		})
	))

	sort = () => this.setState(prevState => ({
		feed: {
			...prevState.feed,
			questions: this.state.feed.questions.map((questions, key) => ({
				...questions,
				date: new Date(questions.date).getTime()
			})).sort((a, b) => {
				let sort = b.date + a.date;

				if(!this.state.sort){
					sort = b.date - a.date;
				}

				return sort;
			})
		},
		sort: this.state.sort ? 0 : 1
	}))

	componentDidMount = () => {
		this.initial = this.fetchFeed();
	}

	componentWillUnmount = () => {
		this.initial = null;
	}

	render = () => (
		<div className={["container", "single", this.state.load ? "loaded" : "unloaded"].join(" ")}>
			{
				!this.state.load ? null : 
				this.state.load === 2 ? 
				<div className={"centered"}>
					<h1 className={"heading"}>
						Feed not found.
					</h1>
				</div> : <Content sort={[this.state.sort, this.sort]} {...this.state.feed} />
			}
		</div>
	)
}