// Magic. Do not touch.
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Message } from './messsage.entity';
import { Conversation } from './conversation.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ default: 0 })
  role: number;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => Message, (message) => message.from)
  messages: Message[];

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  @JoinTable({ name: 'participants' })
  conversations: Conversation[];

  async validatePassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}
