import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';
import { CreateAnswerDto } from './dto/answer.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Get(':id')
  async getChat(@Param('id') id: string) {
    return this.chatService.getChat(id);
  }

  @Put(':id')
  async updateChat(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.updateChat(id, updateChatDto);
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    return this.chatService.deleteChat(id);
  }

  @Post(':id/answer')
  async addAnswer(@Param('id') chatId: string, @Body() createAnswerDto: CreateAnswerDto) {
    return this.chatService.addAnswer(chatId, createAnswerDto);
  }

  @Get(':id/current-question')
  async getCurrentQuestion(@Param('id') chatId: string) {
    return this.chatService.getCurrentQuestion(chatId);
  }
}