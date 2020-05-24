import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Template from './components/template';

import { Listing, Single, Error } from './components/pages';

const App = props => {
  	const base = "/";
  	const routes = [
		{	
			name: "Home",
			path: "/home",
			component: Listing
		},{	
			name: "Page",
			path: "/page/:slug",
			component: Single
		}
  	];

	return (
		<Router basename={base}>
			<Template>
				<Switch>
					<Route exact path={"/"} render={(routerProps) => (
						<Listing {...routerProps}/>
					)}/>

					{
						routes.map((route, key) => (
							<Route key={key} path={route.path} render={(routerProps) => (
								<route.component {...routerProps}/>
							)}/>
						))
					}

					<Route component={Error}/>
				</Switch>
			</Template>
		</Router>
	);
}

export default App;