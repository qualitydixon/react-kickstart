import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Elements', module).add('Button', () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start'
		}}
	>
		<Button primary>
			<span>Hello</span>
		</Button>
		<Button primary>
			<span>Log In</span>
		</Button>
	</div>
));
