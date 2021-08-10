import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Reducers from './Reducers';

const userInfoFromStorage = localStorage.getItem('UserInfo')
	? JSON.parse(localStorage.getItem('UserInfo')!)
	: null;

const initialState: object = {
	userLogin: { userInfo: userInfoFromStorage },
	userRegister: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
	Reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
