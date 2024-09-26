import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatInterface from "./components/ChatInterface";
import ParticipantModal from "./components/ParticipantModal";
import { useRegisterParticipant } from './hooks/useRegisterParticipant';


interface Participant {
  _id: string;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const registerParticipant = useRegisterParticipant();

  useEffect(() => {
    const storedParticipant = localStorage.getItem('participant');
    if (storedParticipant) {
      setParticipant(JSON.parse(storedParticipant));
    }
  }, []);

  const handleRegisterParticipant = async (name: string, email: string) => {
    try {
      const newParticipant = await registerParticipant.mutateAsync({ name, email });
      setParticipant(newParticipant);
      localStorage.setItem('participant', JSON.stringify(newParticipant));
    } catch (error) {
      console.error('Error registering participant:', error);
    }
  };

  return (
      <div className="h-svh bg-background">
        {!participant && <ParticipantModal onRegister={handleRegisterParticipant} />}
        {participant && (
          <div className="bg-primary text-white p-4 shadow-md">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold mb-2">Welcome, {participant.name}!</h1>
              <p className="text-secondary">Your email: {participant.email}</p>
            </div>
          </div>
        )}
        <div className="flex justify-center h-4/5 p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
            {participant && <ChatInterface participantId={participant?._id} />}
          </div>
        </div>
      </div>
  );
}

export default App;