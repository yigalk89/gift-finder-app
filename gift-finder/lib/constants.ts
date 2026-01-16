import { Option } from '@/types';

export const RELATIONSHIPS: Option[] = [
  { value: 'parent', label: 'Parent', emoji: '👨‍👩‍👧' },
  { value: 'sibling', label: 'Sibling', emoji: '👫' },
  { value: 'child', label: 'Child', emoji: '👶' },
  { value: 'grandparent', label: 'Grandparent', emoji: '👴' },
  { value: 'aunt-uncle', label: 'Aunt/Uncle', emoji: '🤗' },
  { value: 'cousin', label: 'Cousin', emoji: '🤝' },
  { value: 'friend', label: 'Friend', emoji: '😊' },
  { value: 'best-friend', label: 'Best Friend', emoji: '💜' },
  { value: 'colleague', label: 'Colleague', emoji: '💼' },
  { value: 'boss', label: 'Boss', emoji: '👔' },
  { value: 'partner', label: 'Partner', emoji: '❤️' },
  { value: 'teacher', label: 'Teacher', emoji: '📚' },
  { value: 'neighbor', label: 'Neighbor', emoji: '🏠' },
  { value: 'client', label: 'Client', emoji: '🤝' },
];

export const BUDGETS: Option[] = [
  { value: 'under-25', label: 'Under $25' },
  { value: '25-50', label: '$25-$50' },
  { value: '50-100', label: '$50-$100' },
  { value: '100-250', label: '$100-$250' },
  { value: '250-500', label: '$250-$500' },
  { value: '500-plus', label: '$500+' },
];

export const GIFT_TYPES: Option[] = [
  { value: 'tangible', label: 'Tangible Gift', emoji: '🎁' },
  { value: 'experience', label: 'Experience', emoji: '✨' },
  { value: 'both', label: 'Open to Both', emoji: '🎯' },
];

export const OCCASIONS: Option[] = [
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'anniversary', label: 'Anniversary', emoji: '💍' },
  { value: 'wedding', label: 'Wedding', emoji: '💒' },
  { value: 'graduation', label: 'Graduation', emoji: '🎓' },
  { value: 'holiday', label: 'Holiday', emoji: '🎄' },
  { value: 'thank-you', label: 'Thank You', emoji: '🙏' },
  { value: 'congratulations', label: 'Congratulations', emoji: '🎉' },
  { value: 'housewarming', label: 'Housewarming', emoji: '🏡' },
  { value: 'new-baby', label: 'New Baby', emoji: '👶' },
  { value: 'just-because', label: 'Just Because', emoji: '💝' },
  { value: 'custom', label: 'Other...', emoji: '✏️' },
];

export const AGE_RANGES: Option[] = [
  { value: 'child', label: 'Child (0-12)' },
  { value: 'teen', label: 'Teen (13-17)' },
  { value: 'young-adult', label: 'Young Adult (18-29)' },
  { value: 'adult', label: 'Adult (30-49)' },
  { value: 'middle-age', label: 'Middle Age (50-64)' },
  { value: 'senior', label: 'Senior (65+)' },
];

export const INTERESTS: Option[] = [
  { value: 'books', label: 'Books & Reading', emoji: '📚' },
  { value: 'cooking', label: 'Cooking', emoji: '👨‍🍳' },
  { value: 'sports', label: 'Sports', emoji: '⚽' },
  { value: 'technology', label: 'Technology', emoji: '💻' },
  { value: 'art', label: 'Art & Crafts', emoji: '🎨' },
  { value: 'music', label: 'Music', emoji: '🎵' },
  { value: 'travel', label: 'Travel', emoji: '✈️' },
  { value: 'fashion', label: 'Fashion', emoji: '👗' },
  { value: 'gaming', label: 'Gaming', emoji: '🎮' },
  { value: 'fitness', label: 'Fitness', emoji: '💪' },
  { value: 'gardening', label: 'Gardening', emoji: '🌱' },
  { value: 'photography', label: 'Photography', emoji: '📷' },
];

export const PERSONALITY_TRAITS: Option[] = [
  { value: 'adventurous', label: 'Adventurous', emoji: '🏔️' },
  { value: 'homebody', label: 'Homebody', emoji: '🏠' },
  { value: 'creative', label: 'Creative', emoji: '🎨' },
  { value: 'practical', label: 'Practical', emoji: '🔧' },
  { value: 'luxury', label: 'Loves Luxury', emoji: '💎' },
  { value: 'minimalist', label: 'Minimalist', emoji: '✨' },
  { value: 'outdoorsy', label: 'Outdoorsy', emoji: '🌲' },
  { value: 'tech-savvy', label: 'Tech Savvy', emoji: '📱' },
  { value: 'foodie', label: 'Foodie', emoji: '🍽️' },
];

export const MOCK_LOCATIONS = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'Jacksonville, FL',
  'Fort Worth, TX',
  'Columbus, OH',
  'San Francisco, CA',
  'Charlotte, NC',
  'Indianapolis, IN',
  'Seattle, WA',
  'Denver, CO',
  'Boston, MA',
];

export const INITIAL_FORM_DATA = {
  relationship: '',
  location: '',
  budget: '',
  giftType: '',
  occasion: '',
  customOccasion: '',
  ageRange: '',
  interests: [],
  personalityTraits: [],
};
