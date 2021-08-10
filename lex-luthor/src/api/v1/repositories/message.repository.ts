import { MessageDto } from 'src/api/v1/conversation/dto/message.dto';
import { Message } from '../entities/messsage.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async sendMessage(messageDto: MessageDto) {
    const { content, fromId, conversationId, timestamp } = messageDto;

    const message = new Message();
    message.content = content;
    message.from = fromId;
    message.conversation = conversationId;
    message.timestamp = timestamp;

    await message.save();
    return message;
  }

  async getConversationMessages(convoId: string): Promise<any> {
    const messages = await this.query(
      `select message.id as "messageId", public."user".id as "userId", public."user"."name", message."content", message."timestamp" 
      from public.message
      join public.user on message."fromId" = public."user".id
      where "conversationId" = ${convoId}
      order by "timestamp"
      limit 100`,
    );

    return messages;
  }
}
