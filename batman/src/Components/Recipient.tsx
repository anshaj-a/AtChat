import React from "react";
// import { timestampToDate } from "../Utilities/Time/TimeFormatter";
import { useDispatch } from "react-redux";
import { SelectConversation } from "../Redux/Actions/Creators/conversation.actions";
import { IDisplayUserInfo } from "../Interfaces/DisplayUserInfo.interface";

interface RecipientProps {
  id: string | number;
  userId: string | number;
  username: string;
  selected?: boolean;
  profilePicture: string;
  name: string;
  lastMessage: string;
  timestamp: string;
}

const Recipient: React.FC<RecipientProps> = ({
  id,
  userId,
  username,
  selected,
  profilePicture,
  name,
  lastMessage,
  timestamp,
}) => {
  const dispatch = useDispatch();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const userInfo: IDisplayUserInfo = {
      id,
      name,
      username,
      profile_picture: profilePicture,
    };
    dispatch(SelectConversation(userInfo));
  };

  return (
    <div
      onClick={handleClick}
      className="px-4 py-5 flex justify-between hover:bg-dark-200 cursor-pointer"
    >
      <img className="rounded-full" src={profilePicture} alt={name} />
      <div>
        <h1 className="text-base">{name}</h1>
        <p className="text-xs text-dark-100">{lastMessage}</p>
      </div>
      <div>
        <p className="text-xs text-grayLight">{timestamp}</p>
      </div>
    </div>
  );
};

export default Recipient;
