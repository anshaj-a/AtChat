import React, { useState } from 'react';
import { ImageIcon } from '../../../../../Assets/Icons/Icons';
import { DarkInput } from '../../../../../Components/Input';
import { getRandomEmoji } from '../../../../../Utilities/Emoji/GetRandomEmoji';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const [message, setMessage] = useState<string>('');
  const [emoji, setEmoji] = useState<string>(getRandomEmoji());

  return (
    <div className='w-full bg-dark-200 flex items-center justify-between p-2'>
      <div>
        <DarkInput
          type='text'
          className='bg-dark-300 p-2 flex-1 w-full'
          spellCheck='false'
          placeholder='Message to Steve...'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <div className='flex'>
        <div
          className='cursor-pointer'
          onMouseOver={() => setEmoji(getRandomEmoji())}
        >
          {emoji}
        </div>
        <div className='cursor-pointer'>
          <ImageIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
