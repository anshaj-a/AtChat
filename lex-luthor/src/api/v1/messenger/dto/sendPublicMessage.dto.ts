import { IsDate, isNotEmpty, IsNotEmpty } from 'class-validator';

export class sendPublicMessageDto {
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
  room;

  @IsNotEmpty()
  conversationId;
}
