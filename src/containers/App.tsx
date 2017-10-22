import * as React from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Home from 'components/Home';
import Header from 'components/Header';
import styled from 'styles/styled-components';
require('../styles/main.scss');

interface Props {
	location: {
		key: string;
	};
}

class App extends React.Component<any, any> {
	render() {
		const { location } = this.props;
		return (
			<div>
				<Header />
				<Navigation>
					<NavList>
						<li>
							<Link to="/">{'Home'}</Link>
						</li>
						<li>
							<Link to="/2">{'Other Route'}</Link>
						</li>
						<li>
							<Link to="/3">{'Another Route'}</Link>
						</li>
						<li>
							<Link to="/asdf">{'404'}</Link>
						</li>
					</NavList>
				</Navigation>
				<Switch>
					<Route exact path="/" component={Home} key="Home" />
					<Route path="/2" component={OtherRoute} />
					<Route path="/3" component={AnotherRoute} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		);
	}
}

const Navigation = styled.nav`display: flex;`;
const NavList = styled.ul`list-style-type: none;`;
const OtherRoute = () => (
	<div>
		<h2>{'Other Route'}</h2>
	</div>
);

const AnotherRoute = () => (
	<div>
		<h2>{'Another Route'}</h2>
	</div>
);

const NoMatch = () => (
	<div>
		<h2>{'404 - Not Found'}</h2>
	</div>
);

export default withRouter(App);
