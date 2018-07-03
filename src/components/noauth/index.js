import React from "react";
import { Icon } from "antd";
import "./index.less";
const NoAuth = () => (
	<div className="noauth ui column ac jc">
		<div>
			<Icon className="icon" type="lock" />
		</div>
		<div className="noauth-txt">无权限</div>
	</div>
);
export default NoAuth;
