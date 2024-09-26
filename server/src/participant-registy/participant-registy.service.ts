import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant, ParticipantDocument } from './schemas/participant.schema';
import { CreateParticipantDto, UpdateParticipantDto } from './dto/participant.dto';

@Injectable()
export class ParticipantRegistryService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>,
  ) {}

  async register(createParticipantDto: CreateParticipantDto): Promise<Participant> {
    const createdParticipant = new this.participantModel(createParticipantDto);
    return createdParticipant.save();
  }

  async findOne(id: string): Promise<Participant> {
    const participant = await this.participantModel.findById(id).exec();
    if (!participant) {
      throw new NotFoundException(`Participant #${id} not found`);
    }
    return participant;
  }

  async findAll(): Promise<Participant[]> {
    return this.participantModel.find().exec();
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    const updatedParticipant = await this.participantModel
      .findByIdAndUpdate(id, updateParticipantDto, { new: true })
      .exec();
    if (!updatedParticipant) {
      throw new NotFoundException(`Participant #${id} not found`);
    }
    return updatedParticipant;
  }

  async remove(id: string): Promise<Participant> {
    const deletedParticipant = await this.participantModel.findByIdAndDelete(id).exec();
    if (!deletedParticipant) {
      throw new NotFoundException(`Participant #${id} not found`);
    }
    return deletedParticipant;
  }
}