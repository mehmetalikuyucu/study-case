import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

interface UpdateChatData {
  id: string;
  data: {
    endTime?: Date;
    currentQuestion?: number;
  };
}

interface ChatResponse {
  _id: string;
  participantId: string;
  startTime: string;
  endTime: string;
  currentQuestion: number;
}

export const useUpdateChat = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ChatResponse, Error, UpdateChatData>({
    mutationFn: ({ id, data }: UpdateChatData) =>
      apiClient.put<ChatResponse>(`/chat/${id}`, data).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['chat', data._id]as any);
    },
  });
};