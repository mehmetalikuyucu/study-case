import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantRegistryController } from './participant-registy.controller';

describe('ParticipantRegistyController', () => {
  let controller: ParticipantRegistryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipantRegistryController],
    }).compile();

    controller = module.get<ParticipantRegistryController>(ParticipantRegistryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
