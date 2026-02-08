export const conversationFlow = [
  {
    id: "destinationType",
    question: "What kind of destination are you looking for?",
    options: [
      { label: "🏖 Beach", value: "beach" },
      { label: "🏔 Mountains", value: "mountains" },
      { label: "🏙 City", value: "city" },
      { label: "🌿 Nature", value: "nature" }
    ]
  },
  {
    id: "budget",
    question: "What’s your budget range?",
    options: [
      { label: "💸 Low", value: "low" },
      { label: "💰 Medium", value: "medium" },
      { label: "💎 High", value: "high" }
    ]
  },
  {
    id: "duration",
    question: "How long is your trip?",
    options: [
      { label: "Weekend (2–3 days)", value: "short" },
      { label: "4–6 days", value: "medium" },
      { label: "1 week or more", value: "long" }
    ]
  }
];
