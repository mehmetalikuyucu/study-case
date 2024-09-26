import React from 'react';
import BotAvatar from './BotAvatar';

interface Props {
  sent: boolean;
  Avatar: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  content: string;
  time: string;
}

const Message: React.FC<Props> = ({ sent, Avatar, name, content, time }) => {
  return (
    <div className={`flex ${sent ? 'justify-end' : 'justify-start'} w-full mb-4`}>
      <div className={`flex ${sent ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
        <div className={`flex-shrink-0 ${sent ? 'ml-2' : 'mr-2'}`}>
          <div className={`rounded-full overflow-hidden bg-white shadow-md ${sent ? 'w-8 h-8' : 'w-10 h-10'}`}>
            {sent ? <BotAvatar className='w-full h-full' /> : <Avatar className='w-full h-full'/>}
          </div>
        </div>
        <div className={`flex flex-col ${sent ? 'items-end' : 'items-start'} max-w-full`}>
          {!sent && <span className="text-sm text-tertiary mb-1">{name}</span>}
          <div className={`p-3 rounded-lg ${sent ? 'bg-tertiary text-background' : 'bg-primary text-background'} break-words`}>
            <p className="text-sm whitespace-pre-line overflow-hidden">{content}</p>
          </div>
          <span className="text-xs text-secondary mt-1">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;