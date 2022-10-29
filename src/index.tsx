import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import { AppRouter } from './app-router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { store } from './store';

import './index.scss';

import './firebase';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <HashRouter>
            <AppRouter />
        </HashRouter>
    </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
