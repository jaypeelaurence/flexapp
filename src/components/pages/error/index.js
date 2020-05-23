import React, { Component } from 'react';

import './style.scss';

export default class Error extends Component {
	constructor(props){
		super(props);

		this.state = {
			load: null
		}
	}

	componentDidMount = () => {
		this.initial = setTimeout(() => (
			this.setState({
				load: 1
			})
		), 300)
	}

	componentWillUnmount = () => {
		this.initial = null;
	}

	render = () => (
		<div className={["container", "errorPage", this.state.load ? "loaded" : "unloaded"].join(" ")}>
			<h1 className={"heading"}>
				Error: <span>Page not found.</span>
			</h1>
		</div>
	)
}