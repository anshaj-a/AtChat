import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity()
export class Participants extends BaseEntity {
  @PrimaryColumn('int') userId: string;
  @PrimaryColumn('int') conversationId: string;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => Conversation)
  conversation: Conversation;
}
