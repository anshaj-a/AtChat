import React, { useState } from "react";
import { ImageIcon } from "../../../../../Assets/Icons/Icons";
import { DarkInput } from "../../../../../Components/Input";
import { getRandomEmoji } from "../../../../../Utilities/Emoji/GetRandomEmoji";

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  const [message, setMessage] = useState<string>("");
  const [emoji, setEmoji] = useState<string>(getRandomEmoji());

  return (
    <div className="w-full bg-dark-200 flex items-center justify-between p-2">
      <div className="w-10/12">
        <DarkInput
          type="text"
          className="bg-dark-300 p-2 w-full"
          spellCheck="false"
          placeholder={`Message to ${name.split(" ")[0]}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex w-2/12 justify-evenly">
        <div
          className="cursor-pointer"
          onMouseOver={() => setEmoji(getRandomEmoji())}
        >
          {emoji}
        </div>
        <div className="cursor-pointer">
          <ImageIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
