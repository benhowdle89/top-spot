import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "./../reducers";

import playlists from './../sample.json'

export default () => {

    const loggerMiddleware = createLogger();

    const rootReducer = combineReducers({
        ...reducers
    });

    const middlewares = applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    );

    const store = createStore(rootReducer, { spotify: { playlists } }, middlewares);

    return { store };
};
