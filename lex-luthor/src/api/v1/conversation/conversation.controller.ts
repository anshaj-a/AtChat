import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConversationService } from './conversation.service';
import { AddConversationDto } from './dto/add-conversation.dto';
import { MessageDto } from './dto/message.dto';

@Controller('api/v1/conversation')
@UseGuards(AuthGuard())
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get(':userId')
  getUserConversation(@Param('userId') userId: string) {
    return this.conversationService.getUserConversations(userId);
  }

  @Get('messages/:convoId')
  getConversationMessages(@Param('convoId') convoId: string) {
    return this.conversationService.getConversationMessages(convoId);
  }

  @Post('message')
  sendMessage(@Body() messageDto: MessageDto) {
    return this.conversationService.sendMessage(messageDto);
  }

  @Post('add')
  addConversation(@Body() addConversationDto: AddConversationDto) {
    return this.conversationService.addConversation(addConversationDto);
  }
}
