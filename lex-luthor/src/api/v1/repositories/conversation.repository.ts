import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<Conversation> {
  async getConversation(id: string) {
    const conversation = await this.findOne({ id });

    if (!conversation) {
      throw new NotFoundException(
        `conversation with the id of ${id} not found`,
      );
    }

    return conversation;
  }
}
