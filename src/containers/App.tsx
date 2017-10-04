import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import Home from 'components/Home';
require('../stylesheets/main.scss');

interface AppState {
	items: Array<string>;
	newItem: string;
}
export default class App extends React.Component<undefined, AppState> {
	constructor(props) {
		super(props);
		this.state = {
			items: ['candle', 'reindeer', 'baseball', 'magazine'],
			newItem: ''
		};
	}

	handleChange(e) {
		e.persist();
		this.setState(() => ({ newItem: e.target.value }));
	}
	render() {
		const { newItem, items } = this.state;
		return (
			<BrowserRouter>
				<div>
					<h2>
						{
							'This is part of the main container. You will always see this, regardless of what route you are on'
						}
					</h2>
					<ul>
						<li>
							<Link to="/">{'Home'}</Link>
						</li>
						<li>
							<Link to="/about">{'About'}</Link>
						</li>
						<li>
							<Link to="/topics">{'Topics'}</Link>
						</li>
					</ul>
					<CSSTransitionGroup
						transitionName="fade"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
					>
						{items.map((item, idx) => <div key={idx}>{item}</div>)}
					</CSSTransitionGroup>
					<input
						type="text"
						placeholder="new item"
						value={newItem}
						className="input"
						onChange={e => this.handleChange(e)}
					/>
					<button
						onClick={() =>
							this.setState(prevState => ({
								items: prevState.items.concat([newItem]),
								newItem: ''
							}))}
					>
						submit
					</button>
					<Switch>
						<Route exact path="/" component={Home} key="Home" />
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
