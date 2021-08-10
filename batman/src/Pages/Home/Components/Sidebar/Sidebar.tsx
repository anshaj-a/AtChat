import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Recipient from '../../../../Components/Recipient';
import { GetUserConversations } from '../../../../Redux/Actions/Creators/conversation.actions';
import Header from './Components/Header';
import { IUserInfo } from '../../../../Interfaces/UserInfo.interface';
import { IConversation } from '../../../../Interfaces/Conversation.interface';

interface SidebarProps {
  convoId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ convoId }) => {
  // User Login check
  const userLogin = useSelector((state: any) => state.userLogin);
  const userRegister = useSelector((state: any) => state.userRegister);

  let user: IUserInfo;

  if (userLogin.userInfo) {
    const { userInfo } = userLogin;
    user = userInfo;
  } else {
    const { userInfo } = userRegister;
    user = userInfo;
  }

  // Redux
  const dispatch = useDispatch();
  const userConversations = useSelector(
    (state: any) => state.userConversations
  );
  const { loading, errors, conversations } = userConversations;

  // Get Conversations when the component renders
  useEffect(() => {
    dispatch(GetUserConversations(user.id));
  }, [dispatch, user.id]);

  return (
    <div className='w-3/12 border-r-2 border-dark-200 min-h-screen sm:w-full md:w-3/4 lg:w-2/4 xl:w-2/4 2xl:w-1/3'>
      <Header />
      <div className='pt-6'>
        {errors && <div className=''>{errors}</div>}
        {loading && <div>Loading...</div>}
        {conversations?.map((c: IConversation) => (
          <Recipient
            key={c.conversationId}
            id={c.conversationId}
            userId={c.userId}
            name={c.name}
            username={c.username}
            profilePicture={
              c.profilePicture
                ? c.profilePicture
                : 'https://via.placeholder.com/56'
            }
            timestamp={c.timestamp ? c.timestamp : '...'}
            lastMessage={c.lastMessage ? c.lastMessage : 'Tap to chat'}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
