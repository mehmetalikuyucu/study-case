export class CreateChatDto {
    participantId: string;
    startTime: Date;
    endTime: Date;
    currentQuestion: number;
  }
  
  export class UpdateChatDto {
    endTime?: Date;
    currentQuestion?: number;
  }