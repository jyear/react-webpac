import { ADDTODO } from "./types";
import { handleActions } from "redux-actions";
import { addTodo } from "./action";
const defaultState = {};
const reducer = handleActions(
	{
		[addTodo]: (state, { payload }) => {
			return { ...state, ...payload };
		}
	},
	defaultState
);

export default reducer;
