import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { AppRouter } from './app-router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { store } from './store';

import './index.scss';

import './firebase';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
            <HashRouter>
                <AppRouter />
            </HashRouter>
        </Provider>
    </SnackbarProvider>,
);

serviceWorkerRegistration.register();
