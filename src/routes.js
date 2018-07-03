import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import PrivateRoute from "./components/main";
import Login from "./entries/login";
import Home from "./entries/home";
import NoPath from "./entries/nopath";
export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Login} />
			<PrivateRoute path="/home" component={Home} />
			<PrivateRoute path="/user" component={Home} />
			<Route path="/404" component={NoPath} />
			<Redirect
				from="*"
				to={{
					pathname: "/404"
				}}
				component={NoPath}
			/>
		</Switch>
	);
};
