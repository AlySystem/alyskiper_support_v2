import React from 'react';
import ReactDOM from 'react-dom';
import Skiper from './routes/Skiper';
import * as serviceWorker from './serviceWorker';
import './scss/styles.scss'

ReactDOM.render(<Skiper />, document.getElementById('root'));

serviceWorker.unregister();
