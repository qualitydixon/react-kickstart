import * as React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import Home from 'components/Home';
import styled from 'styles/styled-components';
require('../styles/main.scss');

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
					<TitleWrapper>
						<AppTitle>
							<span>{'React'}</span>
							<TitleDecorator>{'React'}</TitleDecorator>
						</AppTitle>
						<AppTitle>{'Kickstart'}</AppTitle>
					</TitleWrapper>
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

interface AppTitleProps {
	children: string;
}
const AppTitle = styled.h1`
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: 15vw;
	margin: 0;
	font-weight: 700;
	position: relative;
	display: block;
	background-color: #ffe2df;
	z-index: 2;
	&:before {
		content: 'React';
		display: none;
		position: absolute;
		top: -80%;
		left: 0;
		font-size: 15vw;
		color: #464cdc;
		overflow: hidden;
		transform: translateY(50%);
		z-index: -1;
	}
	> span {
		&:first-child {
			background-color: #ffe2df;
			display: block;
			line-height: 90%;
		}
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 8em;
`;

const TitleDecorator = styled.span`
	position: absolute;
	top: -130%;
	left: 0;
	font-size: 15vw;
	color: #464cdc;
	overflow: hidden;
	transform: translateY(50%);
	z-index: -1;
`;
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
