import { IsDate, IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsDate()
  timestamp: Date;

  @IsNotEmpty()
  fromId;

  @IsNotEmpty()
  conversationId;
}
