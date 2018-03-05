import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./../etc/configure-store";

import Home from './../pages/home'

const { store } = configureStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Home />
                </div>
            </Provider>
        );
    }
}

export default App;
