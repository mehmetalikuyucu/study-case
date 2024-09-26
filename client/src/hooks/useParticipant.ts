import { useSyncExternalStore } from 'react';
import { storage, Participant } from '../store/local';

export const useParticipant = () => {
  return useSyncExternalStore<Participant | null>(
    storage.subscribe,
    storage.getParticipant
  );
};