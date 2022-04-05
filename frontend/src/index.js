import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyContextProvider from './contexts/MyContext';

ReactDOM.render(
    <React.StrictMode>
        <MyContextProvider>
            <App />
        </MyContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

