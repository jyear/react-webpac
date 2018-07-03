import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import NoAuth from "../noauth/";
const { Header, Sider, Content } = Layout;
import "./index.less";
const getFakeAuth = () => {
	return true;
};
const getPageAuth = pathname => {
	return true;
};
const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			getFakeAuth() ? (
				<Layout className="mainBox">
					<Sider className="main-menu">
						<div className="logo">Token 360</div>
						<Menu
							theme="dark"
							mode="inline"
							defaultSelectedKeys={["1"]}
						>
							<Menu.Item key="1">
								<Link
									className="link"
									to={{
										pathname: "/home"
									}}
								>
									<Icon type="pie-chart" />
									<span>首页</span>
								</Link>
							</Menu.Item>
							<Menu.Item key="2">
								<Link
									className="link"
									to={{
										pathname: "/home"
									}}
								>
									<Icon type="lock" />
									<span>权限管理</span>
								</Link>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout className="main-content">
						{getPageAuth([props.location.pathname]) ? (
							<Component {...props} />
						) : (
							<NoAuth />
						)}
					</Layout>
				</Layout>
			) : (
				<Redirect
					to={{
						pathname: "/",
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);
export default PrivateRoute;
