import React, { useEffect, useState, useRef } from "react";
import SendIcon from "./SendIcon";
import Message from "./Message";
import ParticipantAvatar from "./ParticipantAvatar";
import {  useAddAnswer } from '../hooks/useAddAnswer';
import { useGetChat } from '../hooks/useGetChat';
import {
  useCreateChat
} from '../hooks/useCreateChat';
import {  
  useGetCurrentQuestion } from '../hooks/useCurrentQuestion';
interface MessageType {
  id: number;
  text: string;
  sent: boolean;
  time: string;
  name?: string;
}

interface ChatInterfaceProps {
  participantId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ participantId }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const createChat = useCreateChat();
  const { data: chat } = useGetChat(chatId || '');
  const addAnswer = useAddAnswer();
  const { data: currentQuestion } = useGetCurrentQuestion(chatId || '');

  useEffect(() => {
    const initChat = async () => {
      if (!chatId) {
        const newChat = await createChat.mutateAsync({
          participantId,
          startTime: new Date(),
          endTime: new Date(),
          currentQuestion: 1,
        });
        setChatId(newChat._id);
      }
    };
    initChat();
  }, [participantId, chatId, createChat]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() && chatId) {
      const newMessage: MessageType = {
        id: Date.now(),
        text: inputMessage,
        sent: true,
        time: new Date().toLocaleTimeString(),
        name: "You"
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');

      try {
        await addAnswer.mutateAsync({
          chatId,
          answer: {
            questionId: currentQuestion?._id || '',
            time: new Date(),
          },
        });
      } catch (error) {
        console.error('Error adding answer:', error);
      }
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full bg-background">
      <div ref={chatboxRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            sent={message.sent}
            Avatar={ParticipantAvatar}
            name={message.name || "Unknown"}
            time={message.time}
            content={message.text}
          />
        ))}
      </div>
      <div className="bg-white border-t border-secondary p-4">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="block w-full p-3 pr-12 text-sm text-primary border border-secondary rounded-lg bg-background focus:ring-tertiary focus:border-tertiary"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bg-primary hover:bg-tertiary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-3 py-2 text-white"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;