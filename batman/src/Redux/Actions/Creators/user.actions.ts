import { LoginActionTypes, RegisterActionTypes } from '../Types/user.types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Dispatch } from 'react';
import { ActionTypeLogin, ActionTypeRegister } from '../user';
import { IUserInfo } from '../../../Interfaces/UserInfo.interface';

export const Login =
	(loginData: { username: string; password: string }) =>
	async (dispatch: Dispatch<ActionTypeLogin>) => {
		try {
			// User requesting to login => Loading => True.
			dispatch({
				type: LoginActionTypes.LOGIN_REQUEST,
			});

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'/api/v1/auth/login',
				loginData,
				config
			);
			const decodedJwt: IUserInfo = jwtDecode(data.accessToken);

			// User got logged in if everything went right => Loading => False and return a JWT Token.
			dispatch({
				type: LoginActionTypes.LOGIN_SUCCESS,
				payload: { ...decodedJwt },
			});

			localStorage.setItem('UserInfo', JSON.stringify(decodedJwt));
			localStorage.setItem('UserInfoJwt', JSON.stringify(data));
		} catch (error: any) {
			// Something went wrong and now, we need to show what went wrong.
			dispatch({
				type: LoginActionTypes.LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const Register =
	(registerData: { name: string; username: string; password: string }) =>
	async (dispatch: Dispatch<ActionTypeRegister>) => {
		try {
			// User requesting to register => Loading => True.
			dispatch({
				type: RegisterActionTypes.REGISTER_REQUEST,
			});

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'api/v1/auth/signup',
				registerData,
				config
			);
			const decodedJwt: IUserInfo = jwtDecode(data.accessToken);

			// User got registered if everything went right => Loading => False and return a JWT Token.
			dispatch({
				type: RegisterActionTypes.REGISTER_SUCCESS,
				payload: { ...decodedJwt },
			});

			localStorage.setItem('UserInfo', JSON.stringify(decodedJwt));
			localStorage.setItem('UserInfoJwt', JSON.stringify(data));
		} catch (error: any) {
			dispatch({
				type: RegisterActionTypes.REGISTER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
