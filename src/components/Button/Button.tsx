import * as React from 'react';
import styled, { StyledFunction } from 'styled-components';
import { Colors } from 'styles/colors';

interface Props {
	loading?: boolean;
	href?: string;
	disabled?: boolean;
	children: JSX.Element;
	large?: boolean;
	minimal?: boolean;
	primary?: boolean;
	secondary?: boolean;
	danger?: boolean;
}

export default class Button extends React.Component<Props> {
	render() {
		const { children, ...rest } = this.props;
		return <StyledButton {...rest}>{children}</StyledButton>;
	}
}

const button: StyledFunction<Props & React.HTMLProps<HTMLButtonElement>> =
	styled.button;
const StyledButton = button`
	// @ts-ignore
	background-color: ${props => getBackground(props)};
	padding: 0.5em 1em;
	border: none;
	border-radius: 3px;
	color: #fff;
	font-size: 1em;
	margin-bottom: 1em;
`;

function getBackground(props) {
	const { primary, secondary } = props;
	if (primary) {
		return Colors.blue;
	} else {
		return Colors.tealBlue;
	}
}
