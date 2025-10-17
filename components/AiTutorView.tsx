import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createChat } from '../services/geminiService';
import type { ChatMessage, Lesson } from '../types';
import type { Chat } from '@google/genai';
import { SendIcon, SparklesIcon } from './icons';

interface AiTutorViewProps {
  activeLesson: Lesson | null;
}

const proactivePrompts: Record<string, string> = {
    'scratch-1': 'Bạn có muốn tôi giải thích rõ hơn sự khác biệt giữa Nhân vật (Sprite) và Sân khấu (Stage) không?',
    'scratch-2': 'Vòng lặp rất mạnh mẽ! Bạn có muốn xem một ví dụ về cách tạo ra một hình xoắn ốc đầy màu sắc bằng cách lặp lại khối xoay và di chuyển không?',
    'scratch-3': 'Biến số là một khái niệm rất quan trọng! Bạn có muốn một ví dụ về cách tạo bộ đếm thời gian trong trò chơi không?',
    'scratch-5': 'Tin nhắn là một cách tuyệt vời để các nhân vật "nói chuyện" với nhau. Bạn có muốn một ý tưởng về cách sử dụng tin nhắn để tạo một trò chơi nhỏ có nhiều cấp độ không?',
    'robotics-2': 'Động cơ và cảm biến là "mắt" và "tay chân" của robot. Bạn có muốn biết thêm về cách chúng hoạt động cùng nhau để tạo ra một robot thông minh không?',
    'robotics-4': 'Logic dò đường rất thú vị! Bạn có muốn thảo luận về các trường hợp phức tạp hơn, chẳng hạn như khi robot gặp một ngã ba hoặc một đường kẻ bị đứt quãng không?',
};

const AiTutorView: React.FC<AiTutorViewProps> = ({ activeLesson }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const getInitialMessage = useCallback(() => {
    if (activeLesson) {
      const proactivePrompt = proactivePrompts[activeLesson.id];
      if (proactivePrompt) {
          return `Xin chào! Tôi thấy bạn đang học bài "${activeLesson.title}". ${proactivePrompt}`;
      }
      return `Xin chào! Tôi thấy bạn đang xem bài học "${activeLesson.title}". Bạn có câu hỏi nào về chủ đề này không?`;
    }
    return 'Xin chào! Tôi là gia sư AI của bạn. Bạn muốn học về Scratch hay Robotics hôm nay?';
  }, [activeLesson]);

  useEffect(() => {
    setChat(createChat());
    setMessages([{ sender: 'bot', text: getInitialMessage() }]);
  }, [getInitialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (messageToSend: string) => {
    if (!messageToSend.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: messageToSend };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const stream = await chat.sendMessageStream({ message: messageToSend });
      
      let botResponse = '';
      setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = botResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
    setUserInput('');
  };

  const handleGetInspiration = () => {
      if(activeLesson && !isLoading) {
        const prompt = `✨ Truyền cảm hứng cho em! Dựa trên bài học "${activeLesson.title}", hãy cho em 2-3 ý tưởng dự án độc đáo và thú vị.`;
        handleSendMessage(prompt);
      }
  }


  return (
    <div className="flex flex-col h-full p-4 bg-gray-800/30">
      <h2 className="text-2xl font-bold text-purple-400 mb-4 border-b border-gray-700 pb-2">Gia sư AI</h2>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-brain text-white text-sm"></i>
              </div>
            )}
            <div className={`max-w-xl p-3 rounded-lg shadow-md ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {isLoading && msg.sender === 'bot' && index === messages.length -1 && <span className="animate-pulse">...</span>}
            </div>
             {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-user text-white text-sm"></i>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleFormSubmit} className="mt-4 flex items-center gap-3">
        <button
            type="button"
            onClick={handleGetInspiration}
            disabled={isLoading || !activeLesson}
            className="bg-yellow-500/80 text-white font-bold p-3 rounded-lg hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110"
            aria-label="Nhận ý tưởng dự án"
            title="Truyền cảm hứng cho em!"
        >
            <SparklesIcon />
        </button>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Hỏi tôi bất cứ điều gì về Scratch hoặc Robotics..."
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="bg-purple-600 text-white font-bold p-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110"
          aria-label="Gửi tin nhắn"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default AiTutorView;