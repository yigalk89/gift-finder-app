export interface FormData {
  // Step 1 - Basic Information
  relationship: string;
  location: string;
  budget: string;
  giftType: string;
  occasion: string;
  customOccasion: string;

  // Step 2 - Personalization
  ageRange: string;
  interests: string[];
  personalityTraits: string[];
}

export interface Gift {
  name: string;
  price: string;
  type: string;
  description: string;
  explanation: string;
  shop: string;
  category: string;
  emoji: string;
}

export interface Option {
  value: string;
  label: string;
  emoji?: string;
}

export type Step = 1 | 2 | 3;
