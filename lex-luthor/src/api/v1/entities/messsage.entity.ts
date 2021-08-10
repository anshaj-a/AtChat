import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Column()
  timestamp: Date;

  @Column()
  content: string;

  @ManyToOne((type) => User, (user) => user.messages)
  from: User;

  @ManyToOne((type) => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
