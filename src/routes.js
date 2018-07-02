import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Home from "./entries/home";

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
		</Switch>
	);
};
