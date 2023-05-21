import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
//fontawesme
import '@fortawesome/fontawesome-free/css/all.min.css'

//global css
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <App />
);
