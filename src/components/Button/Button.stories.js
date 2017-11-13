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
			<span>Hello World</span>
		</Button>
		<Button primary>
			<span>Log In</span>
		</Button>
		<Button>
			<span>Save Settings</span>
		</Button>
		<Button danger>
			<span>Delete Account</span>
		</Button>
		<Button success>
			<span>Settings Saved</span>
		</Button>
	</div>
));
