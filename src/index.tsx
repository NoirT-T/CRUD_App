import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './Components/app/app';
import {Provider} from "react-redux";
import store from './redux/index'
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import 'styles.scss';



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('Root')
);