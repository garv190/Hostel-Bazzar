import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  avatar?: string;
  senderName?: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m interested in the MacBook Pro you posted.',
      sender: 'user',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
    },
    {
      id: '2',
      text: 'Hello! Thanks for your interest. It\'s in excellent condition, barely used for 6 months.',
      sender: 'other',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      senderName: 'John Doe'
    },
    {
      id: '3',
      text: 'Can I see it tomorrow? I\'m in Hostel B.',
      sender: 'user',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: '4',
      text: 'Sure! I\'m free after 4 PM. I can meet you at the common area.',
      sender: 'other',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      senderName: 'John Doe'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate response (in production, this would be handled by WebSocket)
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for your message! I\'ll get back to you soon.',
          sender: 'other',
          timestamp: new Date(),
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
          senderName: 'John Doe'
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              alt="John Doe"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm opacity-80">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {msg.sender === 'other' && (
                  <img
                    src={msg.avatar}
                    alt={msg.senderName}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}