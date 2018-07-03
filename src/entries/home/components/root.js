import React, { PureComponent } from "react";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		console.log(this.props);
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
			<div>
				<div className="txt">
					spansndna
					<div className="txt2">{user && user.name}</div>
				</div>
			</div>
			// <I18n>
			// 	{(t, { i18n }) => (
			// 		<div className="main-box projectlist">
			// 			<Menu
			// 				submitFeed={this.submitFeed.bind(this)}
			// 				curmenu="project"
			// 				lng={lng}
			// 			/>
			// 			<div className="content-container">
			// 				<HeaderNav history={this.props.history} />
			// 				<div className="content project-content">123</div>
			// 			</div>
			// 		</div>
			// 	)}
			//</I18n>
		);
	}
}
