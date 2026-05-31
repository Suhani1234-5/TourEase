/**
 * Smart Trip Planner — AI generation with rule-based fallback.
 * Returns structured JSON for the frontend cards UI.
 */
const OpenAI = require('openai');
const weatherService = require('./weatherService');

const TRAVEL_TYPES = [
  'budget',
  'luxury',
  'adventure',
  'family',
  'solo',
  'beach',
  'mountains',
];

const openai = process.env.OPENROUTER_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    })
  : null;

/** Build ISO date range from "days" count starting tomorrow */
function buildDateRange(days) {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + Math.max(1, days) - 1);

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  };
}

/** Rule-based planner when AI key is missing or API fails */
function generateRuleBasedPlan(input) {
  const {
    destination,
    budget,
    days,
    travelType,
    interests = [],
    travelers = 1,
  } = input;

  const budgetNum = Number(budget) || 50000;
  const perDay = Math.round(budgetNum / days);
  const interestText =
    interests.length > 0 ? interests.join(', ') : 'sightseeing and local culture';

  const typeActivities = {
    budget: ['street food tours', 'public transport', 'free walking tours'],
    luxury: ['fine dining', 'spa sessions', 'private guided tours'],
    adventure: ['trekking', 'water sports', 'off-road excursions'],
    family: ['theme parks', 'interactive museums', 'kid-friendly cafes'],
    solo: ['café hopping', 'photography walks', 'local meetups'],
    beach: ['sunset beaches', 'snorkeling', 'coastal drives'],
    mountains: ['scenic viewpoints', 'nature trails', 'hill station cafes'],
  };

  const activities = typeActivities[travelType] || typeActivities.budget;

  const dailyItinerary = Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    return {
      day,
      title: `Day ${day} — ${destination}`,
      morning: `Explore ${destination} highlights aligned with ${interestText}. ${activities[0]}.`,
      afternoon: `Visit popular attractions and ${activities[1] || 'local markets'}.`,
      evening: `Relax with ${activities[2] || 'dinner at a recommended spot'}.`,
      estimatedDailyCost: perDay,
      activities: [
        { time: 'morning', name: activities[0], type: 'sightseeing' },
        { time: 'afternoon', name: activities[1] || 'City exploration', type: 'activity' },
        { time: 'evening', name: 'Local dining', type: 'dining' },
      ],
    };
  });

  const hotelMultiplier =
    travelType === 'luxury' ? 0.35 : travelType === 'budget' ? 0.2 : 0.28;

  return {
    summary: `A ${days}-day ${travelType} trip to ${destination} for ${travelers} traveler(s), focused on ${interestText}.`,
    estimatedCost: {
      total: budgetNum,
      currency: 'INR',
      perPerson: Math.round(budgetNum / travelers),
      breakdown: {
        accommodation: Math.round(budgetNum * hotelMultiplier),
        food: Math.round(budgetNum * 0.25),
        transport: Math.round(budgetNum * 0.15),
        activities: Math.round(budgetNum * 0.2),
        misc: Math.round(budgetNum * 0.1),
      },
    },
    attractions: [
      { name: `${destination} City Center`, description: 'Must-visit landmarks and photo spots.', rating: 4.5 },
      { name: `Top ${travelType} experience`, description: `Curated for ${travelType} travelers.`, rating: 4.3 },
      { name: 'Hidden local gem', description: 'Off-the-beaten-path recommendation.', rating: 4.6 },
    ],
    hotels: [
      {
        name: travelType === 'luxury' ? 'Grand Heritage Resort' : 'Comfort Stay Inn',
        type: travelType === 'budget' ? 'Hostel / Budget Hotel' : '3–4 Star Hotel',
        pricePerNight: Math.round((budgetNum * hotelMultiplier) / days / travelers),
        note: 'Book early for best rates.',
      },
      {
        name: 'Boutique Homestay',
        type: 'Homestay',
        pricePerNight: Math.round((budgetNum * hotelMultiplier) / days / travelers * 0.85),
        note: 'Great for authentic local experience.',
      },
    ],
    foodSuggestions: [
      { name: 'Local specialty restaurant', cuisine: 'Regional', priceRange: travelType === 'luxury' ? '$$$' : '$' },
      { name: 'Street food market', cuisine: 'Street food', priceRange: '$' },
      { name: 'Café with scenic views', cuisine: 'Continental & local', priceRange: '$$' },
    ],
    transportation: [
      { mode: 'Airport / Station transfer', tip: 'Pre-book cab or use official taxi stand.' },
      { mode: travelType === 'budget' ? 'Metro / Bus' : 'Private cab / rental', tip: 'Use day passes where available.' },
      { mode: 'Walking & local rides', tip: 'Best for short distances in city center.' },
    ],
    dailyItinerary,
    weatherNote: 'Check forecast before outdoor activities.',
    source: 'rule-based',
  };
}

/** Ask AI for structured JSON itinerary */
async function generateWithAI(input) {
  const {
    destination,
    budget,
    days,
    travelType,
    interests = [],
    travelers = 1,
  } = input;

  const { startDate, endDate } = buildDateRange(days);

  let weatherContext = 'Weather unavailable.';
  try {
    const forecast = await weatherService.getWeatherForecast(destination, {
      start: startDate,
      end: endDate,
    });
    if (forecast?.length) {
      weatherContext = forecast
        .map(
          (d) =>
            `${d.date}: ${d.condition}, ${d.temp?.avg ?? 'N/A'}°C, rain ${d.precipitation}%`
        )
        .join('\n');
    }
  } catch (err) {
    console.warn('Weather fetch skipped:', err.message);
  }

  const prompt = `Generate a ${days}-day ${travelType} trip itinerary for ${travelers} traveler(s) to ${destination}.
Budget: ${budget} INR total.
Interests: ${interests.join(', ') || 'general tourism'}.
Weather:\n${weatherContext}

Return ONLY valid JSON (no markdown) matching this schema:
{
  "summary": "string",
  "estimatedCost": { "total": number, "currency": "INR", "perPerson": number, "breakdown": { "accommodation": number, "food": number, "transport": number, "activities": number, "misc": number } },
  "attractions": [{ "name": "string", "description": "string", "rating": number }],
  "hotels": [{ "name": "string", "type": "string", "pricePerNight": number, "note": "string" }],
  "foodSuggestions": [{ "name": "string", "cuisine": "string", "priceRange": "string" }],
  "transportation": [{ "mode": "string", "tip": "string" }],
  "dailyItinerary": [{
    "day": number,
    "title": "string",
    "morning": "string",
    "afternoon": "string",
    "evening": "string",
    "estimatedDailyCost": number,
    "activities": [{ "time": "string", "name": "string", "type": "string" }]
  }],
  "weatherNote": "string"
}`;

  const response = await openai.chat.completions.create({
    model: 'meta-llama/llama-3.1-8b-instruct',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 2000,
    temperature: 0.65,
  });

  const raw = response.choices[0]?.message?.content?.trim();
  if (!raw) throw new Error('AI returned empty response');

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  parsed.source = 'ai';
  return parsed;
}

/**
 * Main entry: validate input, try AI, fallback to rules.
 */
async function generateSmartItinerary(body) {
  const {
    destination,
    budget,
    days,
    travelType,
    interests,
    travelers,
  } = body;

  if (!destination?.trim()) {
    throw Object.assign(new Error('Destination is required'), { status: 400 });
  }
  if (!days || days < 1 || days > 30) {
    throw Object.assign(new Error('Days must be between 1 and 30'), { status: 400 });
  }
  if (!budget || Number(budget) < 1000) {
    throw Object.assign(new Error('Budget must be at least 1000'), { status: 400 });
  }
  if (!travelType || !TRAVEL_TYPES.includes(travelType)) {
    throw Object.assign(
      new Error(`travelType must be one of: ${TRAVEL_TYPES.join(', ')}`),
      { status: 400 }
    );
  }

  const input = {
    destination: destination.trim(),
    budget: Number(budget),
    days: Number(days),
    travelType,
    interests: Array.isArray(interests) ? interests : [],
    travelers: Number(travelers) || 1,
  };

  if (openai && process.env.OPENROUTER_API_KEY) {
    try {
      return await generateWithAI(input);
    } catch (err) {
      console.error('AI planner failed, using rule-based fallback:', err.message);
    }
  }

  return generateRuleBasedPlan(input);
}

/** Convert generatedPlan JSON into Itinerary.dailySchedule shape */
function planToDailySchedule(generatedPlan, startDate) {
  if (!generatedPlan?.dailyItinerary) return [];

  const start = new Date(startDate);

  return generatedPlan.dailyItinerary.map((day) => {
    const date = new Date(start);
    date.setDate(date.getDate() + (day.day - 1));

    const activities = [];
    ['morning', 'afternoon', 'evening'].forEach((slot) => {
      if (day[slot]) {
        activities.push({
          time: slot,
          activity: day[slot],
          location: '',
          type: slot === 'evening' ? 'dining' : 'sightseeing',
          notes: '',
        });
      }
    });

    (day.activities || []).forEach((a) => {
      activities.push({
        time: a.time || 'afternoon',
        activity: a.name || a.activity || '',
        location: a.location || '',
        type: a.type || 'activity',
        notes: a.notes || '',
      });
    });

    return {
      day: day.day,
      date,
      activities,
      eventEnhanced: false,
      weatherAlert: false,
    };
  });
}

module.exports = {
  TRAVEL_TYPES,
  buildDateRange,
  generateSmartItinerary,
  planToDailySchedule,
  generateRuleBasedPlan,
};
