import * as types from './../constants/actionType';

var s4 = () => {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(Math.floor(Math.random()*3)+1 );
}

var generateKey = () => {
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.id === id){
            result = index;
        }
    })
    return result;
}

var data = JSON.parse(localStorage.getItem('task'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
	var id = '';
	var index = -1;
	switch(action.type){
		case types.LIST_ALL:
			return state;
		case types.SAVE_TASK:
			var task = {
				id: action.task.id,
				name: action.task.name,
				status: (action.task.status === 'true' || action.task.status === true) ? true : false
			}
			if(!task.id) {
				task.id = generateKey();
				state.push(task);
				
			} else {
				index = findIndex(state, action.task.id);
				state[index] = task;
			}
			localStorage.setItem('task',JSON.stringify(state));
			return [...state];
		case types.UPDATE_STATUS_TASK:
			id = action.id;
			index = findIndex(state, id);
			/*var cloneTask = {...state[index]};
			cloneTask.status = !cloneTask.status;*/
			 //Cách viết tương đương
				state[index] = {
					...state[index],
					status: !state[index].status
				}
			
			/*if(index !== -1){
				state[index] = cloneTask;
				
			}*/
			localStorage.setItem('task', JSON.stringify(state));
			return [...state];
		case types.DELETE_TASK:
			id = action.id;
			index = findIndex(state, id);
			state.splice(index,1);
			localStorage.setItem('task',JSON.stringify(state));
			return [...state];
		default: return state;
	}
};
export default myReducer;