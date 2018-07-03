import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Root from "./components/root";
export default withRouter(connect()(Root));
