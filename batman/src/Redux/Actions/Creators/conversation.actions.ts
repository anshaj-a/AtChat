import axios from 'axios';
import { Dispatch } from 'react';
import { IDisplayUserInfo } from '../../../Interfaces/DisplayUserInfo.interface';
import {
  ActionTypeGetConversation,
  ActionTypeGetMessages,
  ActionTypeSelectConversation,
} from '../conversation';
import {
  GetConversationActionTypes,
  GetMessagesActionTypes,
  SelectConversationActionTypes,
} from '../Types/conversation.types';

export const GetUserConversations =
  (userId: string | number) =>
  async (dispatch: Dispatch<ActionTypeGetConversation>) => {
    try {
      // User requesting to get conversations => Loading => True.
      dispatch({
        type: GetConversationActionTypes.GET_CONVERSATION_REQUEST,
      });

      // Get User JWT to authenticate with server
      const jwt = localStorage.getItem('UserInfoJwt');
      const { accessToken } = JSON.parse(jwt!);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axios.get(`api/v1/conversation/${userId}`, config);

      // User got conversations if everything went right => Loading => False and return conversation.
      dispatch({
        type: GetConversationActionTypes.GET_CONVERSATION_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      // Something went wrong and now, we need to show what went wrong.
      dispatch({
        type: GetConversationActionTypes.GET_CONVERSATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const SelectConversation =
  (userInfo: IDisplayUserInfo) =>
  async (dispatch: Dispatch<ActionTypeSelectConversation>) => {
    dispatch({
      type: SelectConversationActionTypes.SELECT_CONVERSATION,
      payload: userInfo,
    });
  };

// Get Messages
export const GetConversationMessages =
  (id: string | number) =>
  async (dispatch: Dispatch<ActionTypeGetMessages>) => {
    try {
      dispatch({
        type: GetMessagesActionTypes.GET_MESSAGES_REQUEST,
      });

      const jwt = localStorage.getItem('UserInfoJwt');
      const { accessToken } = JSON.parse(jwt!);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/conversation/messages/${id}`,
        config
      );

      dispatch({
        type: GetMessagesActionTypes.GET_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GetMessagesActionTypes.GET_MESSAGES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
