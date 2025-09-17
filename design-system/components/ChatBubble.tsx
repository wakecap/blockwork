import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble, faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export interface ChatBubbleProps {
  message: string;
  sender: string;
  timestamp: Date;
  type?: 'sent' | 'received' | 'system';
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  avatar?: string;
  isOwn?: boolean;
  showTimestamp?: boolean;
  showStatus?: boolean;
  className?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  timestamp,
  type = 'received',
  status = 'sent',
  avatar,
  isOwn = false,
  showTimestamp = true,
  showStatus = true,
  className = '',
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-neutral-400" />;
      case 'sent':
        return <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-neutral-400" />;
      case 'delivered':
        return <FontAwesomeIcon icon={faCheckDouble} className="w-3 h-3 text-neutral-400" />;
      case 'read':
        return <FontAwesomeIcon icon={faCheckDouble} className="w-3 h-3 text-blue-500" />;
      case 'error':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="w-3 h-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getBubbleStyles = () => {
    if (type === 'system') {
      return 'bg-neutral-100 text-neutral-600 text-center mx-auto max-w-xs';
    }
    
    if (isOwn) {
      return 'bg-primary-600 text-white ml-auto';
    }
    
    return 'bg-white border border-neutral-200 text-neutral-900';
  };

  const getContainerStyles = () => {
    if (type === 'system') {
      return 'flex justify-center my-4';
    }
    
    if (isOwn) {
      return 'flex justify-end mb-4';
    }
    
    return 'flex justify-start mb-4';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (type === 'system') {
    return (
      <div className={`${getContainerStyles()} ${className}`}>
        <div className={`px-4 py-2 rounded-full text-sm ${getBubbleStyles()}`}>
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className={`${getContainerStyles()} ${className}`}>
      <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-xs lg:max-w-md`}>
        {/* Avatar */}
        {!isOwn && (
          <div className="flex-shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={sender}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-neutral-600">
                  {sender.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Message Bubble */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          {/* Sender Name */}
          {!isOwn && (
            <span className="text-xs text-neutral-500 mb-1 ml-1">
              {sender}
            </span>
          )}

          {/* Message Content */}
          <div className={`px-4 py-2 rounded-2xl ${getBubbleStyles()}`}>
            <p className="text-sm leading-relaxed break-words">{message}</p>
          </div>

          {/* Timestamp and Status */}
          <div className={`flex items-center space-x-2 mt-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
            {showTimestamp && (
              <span className="text-xs text-neutral-400">
                {formatTime(timestamp)}
              </span>
            )}
            {showStatus && isOwn && (
              <span className="text-xs">
                {getStatusIcon()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Pre-built chat bubble components
export const SentMessage: React.FC<{
  message: string;
  timestamp: Date;
  status?: ChatBubbleProps['status'];
  showTimestamp?: boolean;
  showStatus?: boolean;
  className?: string;
}> = ({ message, timestamp, status = 'sent', showTimestamp = true, showStatus = true, className = '' }) => {
  return (
    <ChatBubble
      message={message}
      sender="You"
      timestamp={timestamp}
      type="sent"
      status={status}
      isOwn={true}
      showTimestamp={showTimestamp}
      showStatus={showStatus}
      className={className}
    />
  );
};

export const ReceivedMessage: React.FC<{
  message: string;
  sender: string;
  timestamp: Date;
  avatar?: string;
  className?: string;
}> = ({ message, sender, timestamp, avatar, className = '' }) => {
  return (
    <ChatBubble
      message={message}
      sender={sender}
      timestamp={timestamp}
      type="received"
      avatar={avatar}
      isOwn={false}
      className={className}
    />
  );
};

export const SystemMessage: React.FC<{
  message: string;
  timestamp: Date;
  className?: string;
}> = ({ message, timestamp, className = '' }) => {
  return (
    <ChatBubble
      message={message}
      sender="System"
      timestamp={timestamp}
      type="system"
      className={className}
    />
  );
};
