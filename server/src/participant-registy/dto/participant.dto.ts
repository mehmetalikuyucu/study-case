export class CreateParticipantDto {
    name: string;
    email: string;
  }
  
  export class UpdateParticipantDto {
    name?: string;
    email?: string;
  }