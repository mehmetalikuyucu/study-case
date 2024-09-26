import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ParticipantRegistryService } from './participant-registy.service';
import { CreateParticipantDto, UpdateParticipantDto } from './dto/participant.dto';

@Controller('participant-registry')
export class ParticipantRegistryController {
  constructor(private readonly participantRegistryService: ParticipantRegistryService) {}

  @Post()
  async register(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantRegistryService.register(createParticipantDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.participantRegistryService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.participantRegistryService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantRegistryService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.participantRegistryService.remove(id);
  }
}