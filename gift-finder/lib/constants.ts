import { Option, Gift } from '@/types';

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

export const MOCK_GIFTS: Gift[] = [
  {
    name: 'Premium Coffee Maker',
    price: '$89',
    type: 'tangible',
    description: 'A high-quality coffee maker for the perfect morning brew. Features programmable settings and thermal carafe.',
    explanation: 'Perfect for someone who appreciates quality morning routines and enjoys a good cup of coffee at home.',
    shop: 'Amazon',
    category: 'Home & Kitchen',
    emoji: '☕',
  },
  {
    name: 'Yoga Class Package',
    price: '$120',
    type: 'experience',
    description: 'A 10-class package at a local yoga studio. Perfect for relaxation and fitness enthusiasts.',
    explanation: 'Ideal for fitness enthusiasts who value wellness and self-care, offering both physical activity and mental relaxation.',
    shop: 'Local Yoga Studio',
    category: 'Health & Wellness',
    emoji: '🧘',
  },
  {
    name: 'Wireless Headphones',
    price: '$149',
    type: 'tangible',
    description: 'Premium noise-canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
    explanation: 'Great for music lovers and tech-savvy individuals who appreciate high-quality audio and modern technology.',
    shop: 'Best Buy',
    category: 'Electronics',
    emoji: '🎧',
  },
  {
    name: 'Gourmet Cooking Class',
    price: '$95',
    type: 'experience',
    description: 'Learn to cook authentic Italian cuisine from a professional chef in a hands-on cooking class.',
    explanation: 'Perfect for foodies and creative individuals who enjoy hands-on experiences and learning new culinary skills.',
    shop: 'Sur La Table',
    category: 'Food & Dining',
    emoji: '👨‍🍳',
  },
  {
    name: 'Smart Watch',
    price: '$249',
    type: 'tangible',
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and customizable watch faces.',
    explanation: 'Excellent choice for tech-savvy fitness enthusiasts who like to track their health metrics and stay connected.',
    shop: 'Target',
    category: 'Technology',
    emoji: '⌚',
  },
  {
    name: 'Spa Day Package',
    price: '$175',
    type: 'experience',
    description: 'Luxurious spa package including massage, facial, and access to spa facilities for ultimate relaxation.',
    explanation: 'Ideal for someone who deserves pampering and relaxation, especially those who appreciate self-care and wellness.',
    shop: 'Local Spa & Wellness',
    category: 'Health & Wellness',
    emoji: '💆',
  },
];
