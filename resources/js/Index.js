import React from 'react';
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Main from "./Main";
import {Provider} from "react-redux";
import generateStore from "./redux/store";

function Index(){
    const store = generateStore();
    return(
        <Provider store={store}>
            <Main />
        </Provider>
    )
}

export default Index;

if (document.getElementById('gim')) {
    ReactDOM.render(<Index />, document.getElementById('gim'));
}
