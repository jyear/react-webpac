import React from "react";
import createHistory from "history/createHashHistory";
import { HashRouter as Router } from "react-router-dom";
import storeFun from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { render as domRender } from "react-dom";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/css/base.less";
import "./assets/css/common.less";
const store = storeFun();
const render = Component => {
	domRender(
		<Provider store={store}>
			<Router>
				<Component />
			</Router>
		</Provider>,
		document.getElementById("root")
	);
};
render(Routes);
registerServiceWorker();
