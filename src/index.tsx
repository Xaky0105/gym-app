import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import { AppRouter } from './app-router';
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
