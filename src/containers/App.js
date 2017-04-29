import React, { PropTypes, Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from 'components/Home';
require('../stylesheets/main.scss');

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<h2>
						{
							'This is part of the main container. You will always see this, regardless of what route you are on'
						}
					</h2>
					<ul>
						<li><Link to="/">{'Home'}</Link></li>
						<li><Link to="/about">{'About'}</Link></li>
						<li><Link to="/topics">{'Topics'}</Link></li>
					</ul>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/topics" component={Topics} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const About = () => (
	<div>
		<h2>{'About'}</h2>
	</div>
);

const Topics = () => (
	<div>
		<h2>{'Topics'}</h2>
	</div>
);

const NoMatch = ({ location }) => (
	<div>
		<h2>{'Whoops'}</h2>
		<p>{`Sorry but ${location.pathname} didn’t match any pages`}</p>
	</div>
);
