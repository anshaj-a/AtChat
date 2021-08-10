import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatMessage, { SentMessage } from '../../../../Components/ChatMessage';
import { IDisplayUserInfo } from '../../../../Interfaces/DisplayUserInfo.interface';
import { IMessage } from '../../../../Interfaces/IMessage';
import { IUserInfo } from '../../../../Interfaces/UserInfo.interface';
import { GetConversationMessages } from '../../../../Redux/Actions/Creators/conversation.actions';
import Footer from './Components/Footer';
import StatusBar from './Components/StatusBar';

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  // If the user is somehow logged in, I should know:
  const userLogin = useSelector((state: any) => state.userLogin);
  const userRegister = useSelector((state: any) => state.userRegister);

  let user: IUserInfo = {
    about: null,
    email: null,
    exp: 0,
    iat: 0,
    id: '',
    name: '',
    profile_picture: null,
    username: '',
  };

  if (userLogin.userInfo) {
    const { userInfo } = userLogin;
    user = userInfo;
  } else {
    const { userInfo } = userRegister;
    user = userInfo;
  }

  // Contact info
  const contactInfo = useSelector((state: any) => state.selectedConversation);
  const { details } = contactInfo;
  const { id, name, username, profile_picture }: IDisplayUserInfo = details;

  const { errors, loading, conversation } = useSelector(
    (state: any) => state.conversationMessages
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetConversationMessages(id));
  }, [dispatch, id, contactInfo]);

  return (
    <div className='min-h-screen w-full flex flex-col justify-between'>
      <StatusBar
        id={id}
        name={name}
        username={username}
        profile_picture={profile_picture}
      />
      <div className='flex-1 overflow-auto p-4'>
        {loading ? (
          <h1 className='text-5xl font-bold'>Loading...</h1>
        ) : errors ? (
          <h1 className='text-5xl font-bold'>
            {typeof errors === 'string' ? errors : errors[0]}
          </h1>
        ) : null}

        {conversation?.map((convo: IMessage) => {
          if (convo.userId !== user.id)
            return <ChatMessage messageInfo={convo} />;
          return <SentMessage messageInfo={convo} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
