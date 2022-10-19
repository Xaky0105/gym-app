import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import { Provider } from 'react-redux';
import store from './store';
import './firebase';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <HashRouter>
            <AppRouter />
        </HashRouter>
    </Provider>,
);
