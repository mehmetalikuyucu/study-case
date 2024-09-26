import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

interface QuestionResponse {
  _id: string;
  question: string;
}

export const useGetCurrentQuestion = (chatId: string): UseQueryResult<QuestionResponse, Error> => {
  return useQuery<QuestionResponse, Error>({
    queryKey: ['currentQuestion', chatId],
    queryFn: () => apiClient.get<QuestionResponse>(`/chat/${chatId}/current-question`).then((res) => res.data),
    enabled: !!chatId, 
  });
};