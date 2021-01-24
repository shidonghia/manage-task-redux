import tasks from './task';
import isDisplayForm from './isDisplayForm';
import {combineReducers} from 'redux';
import editTask from './editTask';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';



const myReducer = combineReducers({
	tasks: tasks,
	isDisplayForm: isDisplayForm,
	editTask: editTask,
	filterTable: filterTable,
	search: search,
	sort: sort
})
export default myReducer;
