import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "./../reducers";

export default () => {

    const loggerMiddleware = createLogger();

    const rootReducer = combineReducers({
        ...reducers
    });

    const middlewares = applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    );

    const store = createStore(rootReducer, {}, middlewares);

    return { store };
};
