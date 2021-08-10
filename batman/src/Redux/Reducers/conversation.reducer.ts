import {
  ActionTypeGetConversation,
  ActionTypeGetMessages,
  ActionTypeSelectConversation,
} from '../Actions/conversation';
import {
  GetConversationActionTypes,
  GetMessagesActionTypes,
  SelectConversationActionTypes,
} from '../Actions/Types/conversation.types';

export interface ConversationState {
  loading: boolean;
  conversations: {} | null;
  errors: string[] | null;
}

const defaultState: ConversationState = {
  loading: false,
  conversations: null,
  errors: [],
};

export const GetUserConversationsReducer = (
  state: ConversationState = defaultState,
  action: ActionTypeGetConversation
): ConversationState => {
  switch (action.type) {
    //  User conversations are on the way
    case GetConversationActionTypes.GET_CONVERSATION_REQUEST:
      return { loading: true, errors: null, conversations: null };

    // User conversations got delivered
    case GetConversationActionTypes.GET_CONVERSATION_SUCCESS:
      return { loading: false, errors: null, conversations: action.payload };

    // User got an error while asking for conversations
    case GetConversationActionTypes.GET_CONVERSATION_FAIL:
      return { loading: false, errors: action.payload, conversations: null };

    default:
      return state;
  }
};

interface SelectConversationDefaultState {
  details: { id: string | number; userId: string | number } | null;
}

const defaultSelectionState: SelectConversationDefaultState = {
  details: null,
};

export const SelectConversationReducer = (
  state = defaultSelectionState,
  action: ActionTypeSelectConversation
) => {
  switch (action.type) {
    case SelectConversationActionTypes.SELECT_CONVERSATION:
      return { ...state, details: action.payload };

    default:
      return state;
  }
};

// Get user conversation messages
interface GetMessagesDefaultState {
  conversation: string[];
  loading: boolean;
  errors: string[] | null;
}

const defaultMessagesState: GetMessagesDefaultState = {
  conversation: [],
  loading: false,
  errors: null,
};

export const GetConversationMessageReducer = (
  state = defaultMessagesState,
  action: ActionTypeGetMessages
): GetMessagesDefaultState => {
  switch (action.type) {
    case GetMessagesActionTypes.GET_MESSAGES_REQUEST:
      return { loading: true, conversation: [], errors: null };

    case GetMessagesActionTypes.GET_MESSAGES_SUCCESS:
      return {
        loading: false,
        conversation: action.payload,
        errors: null,
      };

    case GetMessagesActionTypes.GET_MESSAGES_FAIL:
      return { loading: false, conversation: [], errors: action.payload };

    default:
      return state;
  }
};
