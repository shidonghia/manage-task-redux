import * as types from './../constants/actionType';

var initialState = '';

var myReducer = (state = initialState, action) => {
	switch(action.type){
		case types.SEARCH:
			return action.keyword;
		default: return state;
	}
};
export default myReducer;