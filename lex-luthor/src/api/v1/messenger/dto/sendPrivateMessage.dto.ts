import { IsDate, isNotEmpty, IsNotEmpty } from 'class-validator';

export class sendPrivateMessageDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsDate()
  timestamp: Date;

  @IsNotEmpty()
  fromId;

  @IsNotEmpty()
  fromName;

  @IsNotEmpty()
  receiverId: any;

  @IsNotEmpty()
  conversationId;
}
