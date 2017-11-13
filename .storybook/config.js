import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
	name: 'React Kickstart',
	url: 'https://developer.apple.com/arkit/',
	goFullScreen: false,
	showLeftPanel: true,
	showDownPanel: true,
	showSearchBox: false,
	downPanelInRight: false,
	sortStoriesByKind: false
});

function loadStories() {
	require('../stories');
}

configure(loadStories, module);
