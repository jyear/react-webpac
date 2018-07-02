import { createAction } from "redux-actions";
import http from "../../utils/ajax";
import { ADDTODO } from "./types";

export const addTodo = createAction(ADDTODO, param => {
	return {
		name: "张三丰"
	};
});
