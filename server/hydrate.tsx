import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../src/App';
import store from '../src/store';
import { Provider } from 'react-redux';
import { setInitialGames } from '../src/store/gameSlice';

const initialData = (window as any).__INITIAL_PROPS__;
store.dispatch(setInitialGames(initialData));

hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <Provider store={store}>
        <App />
    </Provider>
);