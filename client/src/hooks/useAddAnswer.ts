import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

interface AddAnswerInput {
  chatId: string;
  answer: {
    questionId: string;
    time: Date;
  };
}

interface AnswerResponse {
  _id: string;
  chatId: string;
  questionId: string;
  time: string;
}

export const useAddAnswer = (): UseMutationResult<AnswerResponse, Error, AddAnswerInput> => {
  const queryClient = useQueryClient();
  
  return useMutation<AnswerResponse, Error, AddAnswerInput>({
    mutationFn: ({ chatId, answer }: AddAnswerInput) =>
      apiClient.post<AnswerResponse>(`/chat/${chatId}/answer`, answer).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['chat', data.chatId]as any);
    },
  });
};