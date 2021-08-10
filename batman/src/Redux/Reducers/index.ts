import { combineReducers } from 'redux';
import {
  GetConversationMessageReducer,
  GetUserConversationsReducer,
  SelectConversationReducer,
} from './conversation.reducer';
import { LoginReducer, RegisterReducer } from './user.reducer';

const rootReducer = combineReducers({
  userLogin: LoginReducer,
  userRegister: RegisterReducer,

  userConversations: GetUserConversationsReducer,
  selectedConversation: SelectConversationReducer,
  conversationMessages: GetConversationMessageReducer,
});

export default rootReducer;
