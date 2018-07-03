import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Root from "./components/root";
import actions from "../../models/actions";
export default withRouter(
	connect(
		({ user }) => ({
			user
		}),
		{
			...actions
		}
	)(Root)
);
