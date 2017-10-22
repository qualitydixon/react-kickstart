import * as React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styles/styled-components';

interface Props {
	location: {
		pathname: string;
	};
}

@withRouter
class Header extends React.Component<any, {}> {
	render() {
		const { location } = this.props;
		return (
			<TitleWrapper>
				<AppTitle>
					<span>{'React'}</span>
					<TitleDecorator pathname={location.pathname}>
						{'React'}
					</TitleDecorator>
				</AppTitle>
				<AppTitle>
					<span>{'Kickstart'}</span>
					<TitleDecorator pathname={location.pathname}>
						{'Kickstart'}
					</TitleDecorator>
				</AppTitle>
			</TitleWrapper>
		);
	}
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
	> span {
		&:first-child {
			display: block;
			line-height: 90%;
		}
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3em 0;
`;

const TitleDecorator = styled.span`
	position: absolute;
	top: -100%;
	left: 0px;
	transform: translate(
		${(props: { pathname: string }) =>
			props.pathname === '/'
				? '10px'
				: `${Math.floor(Math.random() * 41) - 20}px`},
		${(props: { pathname: string }) =>
			props.pathname === '/'
				? '60%'
				: `${Math.floor(Math.random() * 26) + 50}%`}
	);
	transition: transform 200ms ease;
	font-size: 15vw;
	color: #464cdc;
	overflow: hidden;
	z-index: -1;
`;

export default Header;
