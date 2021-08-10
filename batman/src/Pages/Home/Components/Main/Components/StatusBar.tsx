import React from 'react';
import { SidebarIcon } from '../../../../../Assets/Icons/Icons';
import { IDisplayUserInfo } from '../../../../../Interfaces/DisplayUserInfo.interface';

interface StatusBarProps extends IDisplayUserInfo {}

const StatusBar: React.FC<StatusBarProps> = ({
  id,
  name,
  profile_picture,
  username,
}) => {
  return (
    <div className='w-full bg-dark-200 py-4 px-4'>
      <div className='flex'>
        <img className='rounded-full' src={profile_picture} alt={name} />
        <div className='ml-2'>
          <h1 className='text-base'>{name}</h1>
          <p className='text-xs text-dark-100'>@{username}</p>
        </div>
        <button className='ml-auto my-auto p-2 hover:bg-dark-300 rounded-full'>
          <SidebarIcon />
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
