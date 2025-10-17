import React from 'react';

export interface CodingChallenge {
  description: string;
  toolbox: string[];
  solution: string[];
  successMessage: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'scratch' | 'robotics';
  content: string;
  difficulty: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  xpValue: number; // Sẽ được coi là starCoins
  relatedProjects?: string[];
  challenge?: CodingChallenge;
  references?: { title: string; url: string; }[];
}

export interface Project {
  id:string;
  title:string;
  description: string;
  imageUrl: string;
  codeBlocks: string[];
}

export interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorLevel: number;
  likes: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

export interface DailyQuest {
    id: string;
    type: 'complete_lessons' | 'complete_exercises' | 'earn_coins' | 'run_simulations';
    description: string;
    target: number;
    reward: number;
}

export interface UserProfile {
  starCoins: number; // Thay thế xp bằng starCoins
  level: number;
  badges: string[];
  purchasedItems: string[]; // Vật phẩm đã mua
  completedExercises: string[]; // ID các bài tập đã hoàn thành
  completedScenarios: string[]; // ID các kịch bản trong Sân chơi đã hoàn thành
  dailyQuests?: {
    date: string; // "YYYY-MM-DD"
    quests: Array<{
        questId: string;
        progress: number;
        claimed: boolean;
    }>;
  }
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: React.FC<{ className?: string }>;
  type: 'hat' | 'accessory' | 'color';
  value: string; // e.g. 'propeller-hat', '#FF5733'
}


export interface LearningPathStep {
  type: 'lesson';
  id: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  steps: LearningPathStep[];
  completionBadgeId: string;
}

// --- Practice Exercises ---
export type ExerciseData =
  | { type: 'multiple_choice'; question: string; choices: string[]; correctAnswerIndex: number; }
  | { type: 'fill_in_the_blank'; question: string; correctAnswer: string; }
  | { type: 'code_block_order'; blocks: string[]; correctOrder: number[]; };

export interface PracticeExercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  reward: number;
  data: ExerciseData;
}

// --- Simulation Builder ---
export interface SimulationBlock {
    id: string;
    text: string;
    category: 'motion' | 'looks' | 'events' | 'control' | 'motors' | 'sensors';
    command: string; // The key used in commandMap
}

export interface SimulationScenario {
    id: string;
    title: string;
    category: 'scratch' | 'robotics';
    description: string;
    availableBlockIds: string[];
    solution: string[]; // Array of block IDs
    reward: number;
}