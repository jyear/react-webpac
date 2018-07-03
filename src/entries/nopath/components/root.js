import React, { PureComponent } from "react";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let { lng, user } = this.props;
		return (
			<div className="nopath">
				<div>
					<div className="t1">404</div>
					<div>页面不存在</div>
				</div>
			</div>
		);
	}
}
