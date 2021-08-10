import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { LogInDto } from '../auth/dto/log-in.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUserConversations(userId: string): Promise<any> {
    const conversations = await this.query(
      `SELECT public."user".id,
      public."user"."name",
      public."user"."profile_picture",
       public."user".username,
      participants."conversationId",
      conversation."title",
      participants."userId",
      (SELECT MAX(timestamp) AS "timestamp"
       FROM message
       WHERE "conversationId" = ${userId}),
      (SELECT content AS "lastMessage"
       from message
       WHERE timestamp = (SELECT MAX(timestamp) AS "timestamp"
                          FROM message
                          WHERE "conversationId" = ${userId}))
FROM public."user"
        INNER JOIN public.participants ON public."user".id = participants."userId"
        INNER JOIN conversation ON conversation.id = participants."conversationId"
WHERE participants."conversationId" IN (
   SELECT "conversationId"
   FROM participants
   WHERE "userId" = ${userId}
)
 AND participants."userId" <> ${userId}`,
    );

    return conversations;
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { name, username, password } = signUpDto;

    const user = new User();
    user.username = username;
    user.name = name;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      const userData = {
        id: user.id,
        name: user.name,
        username: user.username,
      };
      return userData;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`username ${username} is already taken!`);
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async logIn(logInDto: LogInDto): Promise<any> {
    const { username, password } = logInDto;

    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      const userData = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        about: user.about,
        profile_picture: user.profile_picture,
      };
      return { ...userData };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
