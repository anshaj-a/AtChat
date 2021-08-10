import {
	LoginActionTypes,
	RegisterActionTypes,
} from '../Actions/Types/user.types';
import { ActionTypeLogin, ActionTypeRegister } from '../Actions/user';

// Login
export interface AuthState {
	loading: boolean;
	userInfo: {} | null;
	errors: string[] | null;
}

const defaultState: AuthState = {
	loading: false,
	userInfo: null,
	errors: [],
};

export const LoginReducer = (
	state: AuthState = defaultState,
	action: ActionTypeLogin
): AuthState => {
	switch (action.type) {
		// User login is in process
		case LoginActionTypes.LOGIN_REQUEST:
			return { loading: true, errors: null, userInfo: null };

		// User got logged in successfully
		case LoginActionTypes.LOGIN_SUCCESS:
			return { loading: false, errors: null, userInfo: action.payload };

		// User got an error while logging in
		case LoginActionTypes.LOGIN_FAIL:
			return { loading: false, errors: action.payload, userInfo: null };

		default:
			return state;
	}
};

// Register
export const RegisterReducer = (
	state: AuthState = defaultState,
	action: ActionTypeRegister
): AuthState => {
	switch (action.type) {
		// User register is in process
		case RegisterActionTypes.REGISTER_REQUEST:
			return { loading: true, errors: null, userInfo: null };

		// User got registered in successfully
		case RegisterActionTypes.REGISTER_SUCCESS:
			return { loading: false, errors: null, userInfo: action.payload };

		// User got an error while registering
		case RegisterActionTypes.REGISTER_FAIL:
			return { loading: false, errors: action.payload, userInfo: null };

		default:
			return state;
	}
};
