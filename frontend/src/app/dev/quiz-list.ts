import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';

export const MOCK_QUIZZES: QuizPreview[] = [
  {
    id: '1',
    title: 'The World of AI Ethics',
    category: QuizCategory.COMMUNITY,
    author: 'John Doe',
    questionsCount: 10,
  },
  {
    id: '2',
    title: 'Ancient Civilizations',
    category: QuizCategory.HISTORY,
    author: null,
    questionsCount: 15,
  },
  {
    id: '3',
    title: 'Quantum Physics Basics',
    category: QuizCategory.SCIENCE_AND_NATURE,
    author: null,
    questionsCount: 20,
  },
  {
    id: '4',
    title: 'Modern Art Movements',
    category: QuizCategory.ART_AND_LITERATURE,
    author: null,
    questionsCount: 20,
  },
  {
    id: '5',
    title: 'World Geography Challenge',
    category: QuizCategory.GEOGRAPHY,
    author: null,
    questionsCount: 12,
  },
  {
    id: '6',
    title: 'Entertainment Trivia',
    category: QuizCategory.ENTERTAINMENT,
    author: null,
    questionsCount: 18,
  },
  {
    id: '7',
    title: 'Tech Innovations',
    category: QuizCategory.TECHNOLOGY,
    author: null,
    questionsCount: 14,
  },
  {
    id: '8',
    title: 'Mathematics Fundamentals',
    category: QuizCategory.MATHEMATICS,
    author: null,
    questionsCount: 16,
  },
  {
    id: '9',
    title: 'Sports Legends',
    category: QuizCategory.SPORTS,
    author: null,
    questionsCount: 13,
  },
  {
    id: '10',
    title: 'Music Through the Decades',
    category: QuizCategory.POP_CULTURE,
    author: null,
    questionsCount: 17,
  },
  {
    id: '11',
    title: 'General Knowledge Quiz',
    category: QuizCategory.GENERAL_KNOWLEDGE,
    author: null,
    questionsCount: 20,
  },
];
