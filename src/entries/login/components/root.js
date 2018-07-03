import React, { PureComponent } from "react";
import getBingImages from "";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		setTimeout(() => {
			this.props.addTodo();
		}, 3000);
	}
	submitFeed(params) {
		return this.props.submitFeedBack(params);
	}
	render() {
		let { lng, user } = this.props;
		return (
			<div className="login ui ac jc">
				<div className="login-bg">22</div>
				<div className="login-container">ss</div>
			</div>
		);
	}
}
