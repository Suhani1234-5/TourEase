const OpenAI = require("openai");
const weatherService = require("../services/weatherService");

// Support both OpenRouter and direct OpenAI keys
const openaiApiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
const openai = openaiApiKey
  ? new OpenAI({
      apiKey: openaiApiKey,
      baseURL: process.env.OPENROUTER_API_KEY
        ? "https://openrouter.ai/api/v1"
        : undefined,
    })
  : null;

// ============================
// HELPERS
// ============================
const formatDate = (date) => date.toISOString().split("T")[0];

const createDateRange = (start, end) => {
  const [startYear, startMonth, startDay] = start.split("-").map(Number);
  const [endYear, endMonth, endDay] = end.split("-").map(Number);
  const startDate = new Date(Date.UTC(startYear, startMonth - 1, startDay));
  const endDate = new Date(Date.UTC(endYear, endMonth - 1, endDay));
  const dates = [];
  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setUTCDate(current.getUTCDate() + 1)
  ) {
    dates.push(formatDate(new Date(current)));
  }
  return dates;
};

const destinationMustVisits = {
  paris: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
  tokyo: ["Senso-ji Temple", "Shibuya Crossing", "Meiji Shrine"],
  rome: ["Colosseum", "Vatican Museums", "Trevi Fountain"],
  london: ["Tower of London", "British Museum", "London Eye"],
  newyork: ["Statue of Liberty", "Central Park", "Times Square"],
  bali: ["Uluwatu Temple", "Tegallalang Rice Terrace", "Ubud Monkey Forest"],
  dubai: ["Burj Khalifa", "The Dubai Mall", "Palm Jumeirah"],
};

const getMustVisitList = (destination) => {
  const key = destination.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (destinationMustVisits[key]) return destinationMustVisits[key];
  const normalized = destination.trim();
  return [
    `${normalized} historic center or old town`,
    `top local museum or landmark in ${normalized}`,
    `scenic viewpoint or waterfront area in ${normalized}`,
  ];
};

const parseWeatherContext = (weatherContext) => {
  if (!weatherContext || typeof weatherContext !== "string") return {};
  return weatherContext.split("\n").reduce((map, line) => {
    const match = line.match(
      /^Date:\s*(\d{4}-\d{2}-\d{2}),\s*Condition:\s*([^,]+),\s*Temp:\s*([^,]+),\s*Rain Probability:\s*(\d+\.?\d*)%/i
    );
    if (match) {
      map[match[1]] = {
        condition: match[2],
        temp: match[3],
        rain: `${match[4]}%`,
      };
    }
    return map;
  }, {});
};

const validateItineraryPlan = (plan, expectedDates) => {
  if (!plan || typeof plan !== "string") return false;
  const dayMatches = plan.match(/\*\*Day\s+(\d+)/g) || [];
  if (dayMatches.length < expectedDates.length) return false;
  const hasMustVisit = /MUST-VISIT|must-visit|must visit/i.test(plan);
  const hasTravelDetails = /Travel Details:/i.test(plan);
  const hasDailyWeather = /Weather:/i.test(plan);
  return hasMustVisit && hasTravelDetails && hasDailyWeather;
};

const createMockItinerary = ({
  destination,
  startDate,
  endDate,
  travelers,
  budget,
  interests,
  accommodation,
  weatherContext,
}) => {
  const interestText =
    interests && interests.length > 0 ? interests.join(", ") : "general tourism";
  const dates = createDateRange(startDate, endDate);
  const mustVisits = getMustVisitList(destination);
  const weatherMap = parseWeatherContext(weatherContext);

  const dailySections = dates
    .map((date, index) => {
      const day = index + 1;
      const weather = weatherMap[date];
      const umbrellaAdvice =
        weather && weather.rain && Number(weather.rain.replace("%", "")) >= 60
          ? "Carry an umbrella or rain jacket, and plan some indoor options."
          : "Enjoy the day, but keep a light jacket handy in case of changing weather.";

      const weatherLine = weather
        ? `Weather: ${weather.condition}, ${weather.temp}, Rain chance ${weather.rain}. ${umbrellaAdvice}`
        : "Weather: Check local forecast for this day and pack accordingly.";

      const travelLine =
        index === 0
          ? `Travel Details: Arrive at ${destination} in the morning or early afternoon, check in to your ${accommodation || "hotel"}, and settle in before exploring. Use local airport/train shuttle or a rideshare to reach your accommodation.`
          : index === dates.length - 1
          ? `Travel Details: Enjoy the final morning in ${destination} before departing in the afternoon or evening. Allow time for airport/train transfers and final packing.`
          : `Travel Details: Use the day to explore with easy local transfers between activities. Consider using the ${
              destination.toLowerCase().includes("new york")
                ? "subway"
                : destination.toLowerCase().includes("paris")
                ? "metro"
                : "local transit network"
            } or rideshare services for convenience.`;

      return `**Day ${day} – ${date}**
${travelLine}
${weatherLine}
Morning: Begin with a visit to ${mustVisits[0]} in ${destination} and enjoy the local atmosphere.
Afternoon: Explore ${mustVisits[1]} or a neighborhood that matches your interests in ${interestText}.
Evening: Dine at a recommended local spot and finish the day with a relaxing walk around ${mustVisits[2]}.
`;
    })
    .join("\n");

  return `MUST-VISIT PLACES FOR ${destination}:
- ${mustVisits.join("\n- ")}

${dailySections}
TRIP DETAILS:
Destination: ${destination}
Dates: ${startDate} to ${endDate}
Travelers: ${travelers}
Budget: ${budget}
Accommodation: ${accommodation}
Interests: ${interestText}

TRAVEL DETAILS:
- Arrival: Day 1 arrival at the destination, settle in and start with a light activity.
- Departure: Last day departure with time set aside for transfers and final packing.

WEATHER NOTES:
${weatherContext || "Weather information is unavailable. Check local forecasts before travel."}`;
};

// ============================
// GENERATE INITIAL ITINERARY
// ============================
const generateTrip = async (req, res) => {
  const {
    destination,
    startDate,
    endDate,
    travelers,
    budget,
    interests,
    accommodation,
  } = req.body;

  let weatherContext = "Weather data unavailable for these dates.";

  try {
    if (!destination || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // --- Fetch Weather Context ---
    try {
      const forecast = await weatherService.getWeatherForecast(destination, {
        start: startDate,
        end: endDate,
      });
      if (forecast && forecast.length > 0) {
        weatherContext = forecast
          .map(
            (day) =>
              `Date: ${day.date}, Condition: ${day.condition}, Temp: ${day.temp.avg}°C, Rain Probability: ${day.precipitation}%`
          )
          .join("\n");
      }
    } catch (weatherErr) {
      console.error("Weather service integration error:", weatherErr.message);
    }

    const interestText =
      interests && interests.length > 0
        ? interests.join(", ")
        : "general tourism";

    const prompt = `
You are a professional travel planner.

Create a detailed day-by-day itinerary for every single day between ${startDate} and ${endDate}, inclusive.
Destination: ${destination}
Dates: ${startDate} to ${endDate}
Travelers: ${travelers}
Budget: ${budget}
Accommodation: ${accommodation}
Interests: ${interestText}

LOCAL WEATHER FORECAST:
${weatherContext}

IMPORTANT PLANNING RULES:
1. Provide an entry for each calendar day from the start date through the end date.
2. Include 3 must-visit attractions or spots for ${destination} in the itinerary and call them out clearly.
3. Include travel details such as arrival on day 1, departure on the final day, airport/train transfer suggestions, and daily local transport notes.
4. Include a weather note for each day, referencing the forecast if available.
5. WEATHER AWARENESS: If the forecast shows a high rain probability (>60%) or storms, prioritize indoor activities.
6. OUTDOOR OPTIMIZATION: On clear/sunny days, prioritize outdoor landmarks.
7. CLIMATE TIPS: Include specific advice based on the temperature.
8. COMPLETENESS: Ensure the itinerary is COMPLETE.
9. STRUCTURE: Include Morning, Afternoon, and Evening plans with food suggestions and approximate daily budget.

Return in clean readable text.
`;

    let plan;

    if (!openai) {
      console.log("No API key configured — using fallback itinerary.");
      plan = createMockItinerary({
        destination, startDate, endDate, travelers,
        budget, interests, accommodation, weatherContext,
      });
      return res.json({
        plan,
        warning: "Using local fallback itinerary because no API key is configured.",
      });
    }

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1400,
      temperature: 0.7,
    });

    plan = response.choices[0].message.content;

    // Validate AI response; fall back to mock if incomplete
    const dates = createDateRange(startDate, endDate);
    if (!validateItineraryPlan(plan, dates)) {
      console.warn("AI itinerary incomplete — using fallback itinerary.");
      plan = createMockItinerary({
        destination, startDate, endDate, travelers,
        budget, interests, accommodation, weatherContext,
      });
    }

    res.json({ plan });
  } catch (error) {
    console.error("AI Error:", error);
    const plan = createMockItinerary({
      destination, startDate, endDate, travelers,
      budget, interests, accommodation, weatherContext,
    });
    res.json({
      plan,
      warning: "Using local fallback itinerary due to an unexpected error.",
    });
  }
};

// ============================
// REFINE EXISTING ITINERARY
// ============================
const refineTrip = async (req, res) => {
  const { originalPlan, refinementPrompt } = req.body;

  try {
    if (!originalPlan || !refinementPrompt) {
      return res.status(400).json({ error: "Missing refinement data" });
    }

    const prompt = `
You are a travel planner AI.

Here is the current itinerary:
"""
${originalPlan}
"""

User wants the following refinement:
"${refinementPrompt}"

Rules:
- Modify ONLY relevant parts
- Keep the structure day-wise
- Do NOT remove important attractions unless asked
- Maintain clarity and readability

Return the updated itinerary only.
`;

    if (!openai) {
      return res.json({
        updatedPlan: `${originalPlan}\n\nNOTE: Itinerary unchanged — no API key is configured. Set OPENROUTER_API_KEY or OPENAI_API_KEY to enable refinements.`,
      });
    }

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1200,
      temperature: 0.6,
    });

    const updatedPlan = response.choices[0].message.content;

    if (!updatedPlan || updatedPlan.trim().length === 0) {
      throw new Error("AI returned empty refinement");
    }

    res.json({ updatedPlan });
  } catch (error) {
    console.error("Refinement AI Error:", error);
    res.json({
      updatedPlan: `${originalPlan}\n\nNOTE: Refinement failed due to an error. Please try again.`,
    });
  }
};

module.exports = {
  generateTrip,
  refineTrip,
};