import { LoginActionTypes, RegisterActionTypes } from './Types/user.types';

// Login
interface LoginAction {
	type: LoginActionTypes.LOGIN_REQUEST;
}

interface LoginSuccessAction {
	type: LoginActionTypes.LOGIN_SUCCESS;
	payload: {};
}

interface LoginFailAction {
	type: LoginActionTypes.LOGIN_FAIL;
	payload: string[];
}

export type ActionTypeLogin =
	| LoginAction
	| LoginSuccessAction
	| LoginFailAction;

// Register
interface RegisterAction {
	type: RegisterActionTypes.REGISTER_REQUEST;
}

interface RegisterSuccessAction {
	type: RegisterActionTypes.REGISTER_SUCCESS;
	payload: {};
}

interface RegisterFailAction {
	type: RegisterActionTypes.REGISTER_FAIL;
	payload: string[];
}

export type ActionTypeRegister =
	| RegisterAction
	| RegisterSuccessAction
	| RegisterFailAction;
