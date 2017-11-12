import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const render = () =>
	ReactDOM.render(
		<AppContainer>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AppContainer>,
		document.getElementById('app')
	);

render();

if (module.hot) {
	console.info('Module is Hot');
	module.hot.accept();
}
