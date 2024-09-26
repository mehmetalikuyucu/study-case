import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

interface ParticipantData {
  name: string;
  email: string;
}

interface ParticipantResponse {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const useRegisterParticipant = () => {
  const queryClient = useQueryClient();
  
  return useMutation<ParticipantResponse, Error, ParticipantData>({
    mutationFn: (participant: ParticipantData) =>
      apiClient.post<ParticipantResponse>('/participant-registry', participant).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(['participants']as any);
    },
  });
};