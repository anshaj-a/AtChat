import React from 'react';
import { IMessage } from '../Interfaces/IMessage';
import { timestampToDate } from '../Utilities/Time/TimeFormatter';

interface ChatMessageProps {
  messageInfo: IMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messageInfo }) => {
  return (
    <div
      className='relative px-4 py-2 bg-dark-200 rounded-full m-2'
      style={{ width: 'fit-content' }}
      title={`Sent by ${messageInfo.name} at ${timestampToDate(
        messageInfo.timestamp
      )}`}
    >
      {messageInfo.content}
    </div>
  );
};

export default ChatMessage;

export const SentMessage: React.FC<ChatMessageProps> = ({ messageInfo }) => {
  return (
    <div
      className='relative px-4 py-2 bg-primary-600 rounded-full m-2 ml-auto'
      style={{ width: 'fit-content' }}
      title={`Sent by You at ${timestampToDate(messageInfo.timestamp)}`}
    >
      {messageInfo.content}
    </div>
  );
};
