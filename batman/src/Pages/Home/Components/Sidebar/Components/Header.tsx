import React from 'react';
import { ThreeDotsIcon } from '../../../../../Assets/Icons/Icons';
import { DarkInput } from '../../../../../Components/Input';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <h1 className='text-4xl font-bold pt-6 ml-4'>AtChat</h1>
      <div className='flex items-center pt-4'>
        <DarkInput
          className='ml-4 text-xs p-3'
          type='text'
          placeholder='Search something...'
        />
        <button
          className='
          bg-dark-200
          hover:bg-dark-300
          rounded-md
          ml-3
          mr-4
          p-2
          text-xl
        '
        >
          <ThreeDotsIcon />
        </button>
      </div>
    </>
  );
};

export default Header;
