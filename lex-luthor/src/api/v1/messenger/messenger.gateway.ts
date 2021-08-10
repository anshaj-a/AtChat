import { Logger } from '@nestjs/common';

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { sendPrivateMessageDto } from './dto/sendPrivateMessage.dto';
import { sendPublicMessageDto } from './dto/sendPublicMessage.dto';

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

@WebSocketGateway()
export class MessengerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`client connected with id of ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected with id of ${client.id}`);
    removeUser(client.id);
    client.emit('getUsers', users);
  }

  //take userId and socketId from user
  @SubscribeMessage('addUser')
  handleAddUser(client: Socket, userId: string) {
    addUser(userId, client.id);

    client.emit('getUsers', users);
  }

  // send message between to people
  @SubscribeMessage('sendPrivateMessage')
  handlePrivateMessage(client: Socket, messageDto: sendPrivateMessageDto) {
    const { content, fromId, timestamp, receiverId, fromName, conversationId } =
      messageDto;

    const user = getUser(receiverId);

    if (!user) {
      return;
    }

    this.wss.to(user.socketId).emit('getMessage', {
      content,
      fromId,
      timestamp,
      name: fromName,
      conversationId,
    });
  }

  // send the message for a room
  @SubscribeMessage('sendPublicMessage')
  handlePublicMessage(client: Socket, messageDto: sendPublicMessageDto) {
    const { content, fromId, timestamp, room, fromName, conversationId } =
      messageDto;

    this.wss.to(room).emit('getMessage', {
      content,
      fromId,
      timestamp,
      name: fromName,
      conversationId,
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leavedRoom', room);
  }
}
