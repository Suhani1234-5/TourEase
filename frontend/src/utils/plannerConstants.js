/** Travel types supported by Smart Trip Planner */
export const TRAVEL_TYPES = [
  { id: 'budget', label: 'Budget', emoji: '💰' },
  { id: 'luxury', label: 'Luxury', emoji: '✨' },
  { id: 'adventure', label: 'Adventure', emoji: '🏔️' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { id: 'solo', label: 'Solo', emoji: '🎒' },
  { id: 'beach', label: 'Beach', emoji: '🏖️' },
  { id: 'mountains', label: 'Mountains', emoji: '⛰️' },
];

export const INTEREST_OPTIONS = [
  'Beaches',
  'Adventure',
  'Culture',
  'Food',
  'Nightlife',
  'Nature',
  'Shopping',
  'Photography',
  'History',
  'Wildlife',
];

export const INITIAL_FORM = {
  destination: '',
  budget: '',
  days: 5,
  travelType: 'budget',
  interests: [],
  travelers: 2,
};
