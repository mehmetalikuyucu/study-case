export interface Participant {
    name: string;
    email: string;
  }

export const storage = {
    getParticipant: (): Participant | null => {
      const data = localStorage.getItem('participant');
      return data ? JSON.parse(data) : null;
    },
    setParticipant: (participant: Participant): void => {
      localStorage.setItem('participant', JSON.stringify(participant));
    },
    subscribe: (callback: () => void) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
  };