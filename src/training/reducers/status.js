var initialState = false;

var myReducer = (state = initialState, action) => {
	if(action.type === 'toggle_status'){
		var status = !status;
		return {
			status: status,
		}
	};
	return state;
}

export default myReducer;
