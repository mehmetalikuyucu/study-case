import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Answer, AnswerDocument } from './schemas/answer.schema';
import { CreateChatDto, UpdateChatDto } from './dto/chat.dto';
import { CreateAnswerDto } from './dto/answer.dto';
import { ParticipantRegistryService } from '../participant-registy/participant-registy.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    private participantRegistryService: ParticipantRegistryService,
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const participant = await this.participantRegistryService.findOne(createChatDto.participantId);
    if (!participant) {
      throw new NotFoundException(`Participant #${createChatDto.participantId} not found`);
    }
    const createdChat = new this.chatModel({
      ...createChatDto,
      participant: participant._id,
    });
    return createdChat.save();
  }

  async getChat(id: string): Promise<Chat> {
    const chat = await this.chatModel.findById(id).populate('participant').exec();
    if (!chat) {
      throw new NotFoundException(`Chat #${id} not found`);
    }
    return chat;
  }

  async updateChat(id: string, updateChatDto: UpdateChatDto): Promise<Chat> {
    const updatedChat = await this.chatModel
      .findByIdAndUpdate(id, updateChatDto, { new: true })
      .populate('participant')
      .exec();
    if (!updatedChat) {
      throw new NotFoundException(`Chat #${id} not found`);
    }
    return updatedChat;
  }

  async deleteChat(id: string): Promise<Chat> {
    const deletedChat = await this.chatModel.findByIdAndDelete(id).exec();
    if (!deletedChat) {
      throw new NotFoundException(`Chat #${id} not found`);
    }
    return deletedChat;
  }

  async addAnswer(chatId: string, createAnswerDto: CreateAnswerDto): Promise<Chat> {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) {
      throw new NotFoundException(`Chat #${chatId} not found`);
    }
    const answer = new this.answerModel(createAnswerDto);
    await answer.save();
    
    chat.currentQuestion++;
    return chat.save();
  }

  async getCurrentQuestion(chatId: string): Promise<Question> {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) {
      throw new NotFoundException(`Chat #${chatId} not found`);
    }
    const question = await this.questionModel.findOne({ _id: chat.currentQuestion }).exec();
    if (!question) {
      throw new NotFoundException(`Question not found for Chat #${chatId}`);
    }
    return question;
  }
}