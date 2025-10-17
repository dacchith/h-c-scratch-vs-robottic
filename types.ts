
export interface Lesson {
  id: string;
  title: string;
  category: 'scratch' | 'robotics';
  content: string;
}

export interface Project {
  id: string;
  title:string;
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
