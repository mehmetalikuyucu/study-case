import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

interface ChatData {
  participantId: string;
  startTime: Date;
  endTime: Date;
  currentQuestion: number;
}

interface ChatResponse {
  _id: string;
  participantId: string;
  startTime: string;
  endTime: string;
  currentQuestion: number;
}

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ChatResponse, Error, ChatData>({
    mutationFn: (chat: ChatData) => 
      apiClient.post<ChatResponse>('/chat', chat).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['chats']as any);
    },
  });
};