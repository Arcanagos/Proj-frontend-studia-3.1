import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Sites/App';
import MainView from './Sites/MainView';
import Profile from './Sites/Profile';
import Posts from './Sites/Posts';
import Search from './Sites/Search';
import './Sites/App.css';
import './Sites/MainView.css';
import './Sites/Profile.css';
import './Sites/Posts.css';
import './Sites/Search.css';

import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path='/' element={<App />} />
                <Route path="/MainView/:userId" element={<MainView />} />
                <Route path="/Posts/:userId" element={<Posts />} />
                <Route path="/Profile/:userId" element={<Profile />} />
                <Route path="/Search/:userId" element={<Search />} />
            </Route>
        )
    )

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    );
} else {
    console.error('Root element not found');
}
