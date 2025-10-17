import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage, Lesson } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `Bạn là một gia sư AI thân thiện và kiên nhẫn chuyên về lập trình Scratch và robot cho trẻ em và người mới bắt đầu. 
Nhiệm vụ của bạn là giải thích các khái niệm phức tạp một cách đơn giản, cung cấp các ví dụ mã Scratch (dưới dạng văn bản mô tả các khối), đưa ra ý tưởng dự án, và khuyến khích người dùng học hỏi và thu thập huy hiệu.
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

export async function getDebugHint(userScript: string[], correctScript: string[], challengeDescription: string): Promise<string> {
    try {
        const prompt = `
        Bạn là một gia sư lập trình Scratch thân thiện và hữu ích, chuyên giúp học sinh tự tìm ra lỗi.
        Nhiệm vụ: Đừng bao giờ đưa ra đáp án đúng. Thay vào đó, hãy xem xét kịch bản của học sinh, so sánh nó với giải pháp đúng, và đưa ra một gợi ý nhẹ nhàng, tập trung vào lỗi logic.
        
        Bối cảnh:
        - Mô tả thử thách: "${challengeDescription}"
        - Kịch bản đúng là: "${correctScript.join(' -> ')}"
        - Kịch bản của học sinh: "${userScript.join(' -> ')}"

        Phân tích lỗi của học sinh và đưa ra một gợi ý bằng tiếng Việt để giúp họ tự sửa lỗi. Giữ giọng văn khuyến khích và tích cực.
        Ví dụ gợi ý: "Ý tưởng của con hay lắm! AI thấy con đã dùng đúng các khối rồi. Nhưng có vẻ thứ tự của chúng chưa hợp lý lắm. Con thử nghĩ xem hành động nào nên xảy ra trước nhé!"
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API error in getDebugHint:", error);
        return "Rất tiếc, tôi đang gặp chút sự cố để đưa ra gợi ý. Bạn có thể thử lại sau nhé.";
    }
}