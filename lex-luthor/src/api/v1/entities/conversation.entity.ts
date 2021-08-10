import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './messsage.entity';
import { User } from './user.entity';

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  title: string;

  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable({ name: 'participants' })
  users: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
