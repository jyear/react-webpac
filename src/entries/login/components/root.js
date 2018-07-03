import React, { PureComponent } from "react";
import { Input, Button } from "antd";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		document.title = "登录-Token360";
		this.setBg();
	}

	setBg() {
		const winW = window.screen.width;
		const winH = window.screen.height;
		var url = `https://bing.ioliu.cn/v1/rand?w=${winW}&h=${winH}`;
		var bgBox = document.querySelector("#loginBg");
		var img = document.createElement("img");
		img.src = url;
		bgBox.innerHTML = "";
		bgBox.appendChild(img);
	}
	render() {
		let { lng, user } = this.props;
		return (
			<div className="login ui ac jc">
				<div className="login-bg" id="loginBg" ref="loginBg" />
				<div className="login-container ui ac column">
					<div className="title">Token 360</div>
					<div className="login-item">
						<Input size="large" placeholder="用户名" />
					</div>
					<div className="login-item">
						<Input
							size="large"
							type="password"
							placeholder="密码"
						/>
					</div>
					<div className="login-button">
						<Button className="login-btn" type="primary">
							登录
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
