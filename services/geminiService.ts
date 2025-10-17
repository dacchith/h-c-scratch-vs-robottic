
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `Bạn là một gia sư AI thân thiện và kiên nhẫn chuyên về lập trình Scratch và robot cho trẻ em và người mới bắt đầu. 
Nhiệm vụ của bạn là giải thích các khái niệm phức tạp một cách đơn giản, cung cấp các ví dụ mã Scratch (dưới dạng văn bản mô tả các khối), đưa ra ý tưởng dự án, và khuyến khích người dùng học hỏi.
Hãy luôn trả lời bằng tiếng Việt. Giữ cho câu trả lời của bạn ngắn gọn, dễ hiểu và tích cực.`;

export function createChat(): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        },
    });
}
