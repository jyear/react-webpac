import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunkMiddleware from "./middlewares/thunk";
import promiseMiddleware from "./middlewares/promise";
import reduces from "./models/reducers";
const middlewareList = [thunkMiddleware, promiseMiddleware];

let store;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	store = () => {
		return createStore(
			reduces,
			compose(
				applyMiddleware(...middlewareList),
				window.__REDUX_DEVTOOLS_EXTENSION__ &&
					window.__REDUX_DEVTOOLS_EXTENSION__()
			)
		);
	};
} else {
	store = () => {
		return createStore(reduces, applyMiddleware(...middlewareList));
	};
}

export default store;
