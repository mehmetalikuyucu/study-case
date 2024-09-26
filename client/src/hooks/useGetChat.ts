import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

interface ChatResponse {
  _id: string;
  participantId: string;
  startTime: string;
  endTime: string;
  currentQuestion: number;
}

export const useGetChat = (chatId: string): UseQueryResult<ChatResponse, Error> => {
  return useQuery<ChatResponse, Error>({
    queryKey: ['chat', chatId],
    queryFn: () => apiClient.get<ChatResponse>(`/chat/${chatId}`).then((res) => res.data),
    enabled: !!chatId, 
  });
};