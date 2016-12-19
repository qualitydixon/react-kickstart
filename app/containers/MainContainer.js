import React, { PropTypes, Component } from 'react'
import { BrowserRouter, Match, Miss, Link } from 'react-router'
import Home from '../components/Home'
require('../stylesheets/main.scss')

export default class MainContainer extends Component {
	render () {
		return (
			<BrowserRouter>
				<div>
					<h2>{'This is part of the main container. You will always see this, regardless of what route you are on'}</h2>
					<ul>
						<li><Link to="/">{'Home'}</Link></li>
						<li><Link to="/about">{'About'}</Link></li>
						<li><Link to="/topics">{'Topics'}</Link></li>
					</ul>
					<Match exactly pattern="/" component={Home} />
					<Match pattern="/about" component={About} />
					<Match pattern="/topics" component={Topics} />

					<Miss component={NoMatch}/>
				</div>
			</BrowserRouter>
		)
	}
}

const About = () => (
	<div>
		<h2>{'About'}</h2>
	</div>
)

const Topics = () => (
	<div>
		<h2>{'Topics'}</h2>
	</div>
)

const NoMatch = ({ location }) => (
	<div>
		<h2>{'Whoops'}</h2>
		<p>{`Sorry but ${location.pathname} didn’t match any pages`}</p>
	</div>
)

NoMatch.propTypes = {
	location: PropTypes.string.isRequired,
}

MainContainer.propTypes = {
	children: PropTypes.any,
}
