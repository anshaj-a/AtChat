import { IDisplayUserInfo } from '../../Interfaces/DisplayUserInfo.interface';
import {
  GetConversationActionTypes,
  GetMessagesActionTypes,
  SelectConversationActionTypes,
} from './Types/conversation.types';

// Get Conversation
interface GetConversationAction {
  type: GetConversationActionTypes.GET_CONVERSATION_REQUEST;
}

interface GetConversationSucessAction {
  type: GetConversationActionTypes.GET_CONVERSATION_SUCCESS;
  payload: {};
}

interface GetConversationFailAction {
  type: GetConversationActionTypes.GET_CONVERSATION_FAIL;
  payload: string[];
}

export type ActionTypeGetConversation =
  | GetConversationAction
  | GetConversationSucessAction
  | GetConversationFailAction;

// Select Conversation
interface SelectConversationAction {
  type: SelectConversationActionTypes.SELECT_CONVERSATION;
  payload: IDisplayUserInfo;
}

export type ActionTypeSelectConversation = SelectConversationAction;

// Get Messages
interface GetMessagesAction {
  type: GetMessagesActionTypes.GET_MESSAGES_REQUEST;
}

interface GetMessagesSucessAction {
  type: GetMessagesActionTypes.GET_MESSAGES_SUCCESS;
  payload: string[];
}

interface GetMessagesFailAction {
  type: GetMessagesActionTypes.GET_MESSAGES_FAIL;
  payload: string[];
}

export type ActionTypeGetMessages =
  | GetMessagesAction
  | GetMessagesSucessAction
  | GetMessagesFailAction;
