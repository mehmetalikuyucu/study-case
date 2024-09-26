import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantRegistyService } from './participant-registy.service';

describe('ParticipantRegistyService', () => {
  let service: ParticipantRegistyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantRegistyService],
    }).compile();

    service = module.get<ParticipantRegistyService>(ParticipantRegistyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
