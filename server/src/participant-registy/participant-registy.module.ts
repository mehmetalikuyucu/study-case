import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantRegistryController } from './participant-registy.controller';
import { ParticipantRegistryService } from './participant-registy.service';
import { Participant, ParticipantSchema } from './schemas/participant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
  ],
  controllers: [ParticipantRegistryController],
  providers: [ParticipantRegistryService],
  exports: [ParticipantRegistryService],
})
export class ParticipantRegistryModule {}