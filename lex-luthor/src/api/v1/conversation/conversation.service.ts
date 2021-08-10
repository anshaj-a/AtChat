import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Participants } from '../entities/participants.entity';
import { ConversationRepository } from '../repositories/conversation.repository';
import { MessageRepository } from '../repositories/message.repository';
import { UserRepository } from '../repositories/user.repository';
import { AddConversationDto } from './dto/add-conversation.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(MessageRepository)
    private messageRepository: MessageRepository,

    @InjectRepository(ConversationRepository)
    private conversationRepository: ConversationRepository,
  ) {}

  async getUserConversations(userId: string): Promise<any> {
    try {
      const conversations = await this.userRepository.getUserConversations(
        userId,
      );

      return conversations;
    } catch (err) {
      throw new InternalServerErrorException(
        'Error fetching your user conversations',
      );
    }
  }

  async getConversationMessages(convoId: string): Promise<any> {
    try {
      const messages = await this.messageRepository.getConversationMessages(
        convoId,
      );

      return messages;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching your messages');
    }
  }

  async sendMessage(messageDto: MessageDto) {
    try {
      const message = await this.messageRepository.sendMessage(messageDto);
      return message;
    } catch (error) {
      throw new InternalServerErrorException("Message couldn't be sent");
    }
  }

  async addConversation(addConversationDto: AddConversationDto) {
    const { userId, otherUserId } = addConversationDto;
    const userIdExists = await this.userRepository.findOne({ id: userId });
    const otherUserIdExists = await this.userRepository.findOne({
      id: otherUserId,
    });

    if (userIdExists && otherUserIdExists) {
      const conversation = new Conversation();
      conversation.title = null;
      await conversation.save();

      const participants = new Participants();
      participants.conversationId = conversation.id;
      participants.userId = userId;
      await participants.save();

      participants.conversationId = conversation.id;
      participants.userId = otherUserId;
      await participants.save();

      return conversation;
    } else {
      throw new BadRequestException();
    }
  }
}
