const OpenAI = require("openai");
const weatherService = require("../services/weatherService");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ============================
// GENERATE INITIAL ITINERARY
// ============================
const generateTrip = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      travelers,
      budget,
      interests,
      accommodation,
    } = req.body;

    if (!destination || !startDate || !endDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // --- Fetch Weather Context ---
    let weatherContext = "Weather data unavailable for these dates.";
    try {
      const forecast = await weatherService.getWeatherForecast(destination, { 
        start: startDate, 
        end: endDate 
      });
      
      if (forecast && forecast.length > 0) {
        weatherContext = forecast.map(day => 
          `Date: ${day.date}, Condition: ${day.condition}, Temp: ${day.temp.avg}°C, Rain Probability: ${day.precipitation}%`
        ).join("\n");
      }
    } catch (weatherErr) {
      console.error("⚠️ Weather service integration error:", weatherErr.message);
    }

    const interestText =
      interests && interests.length > 0
        ? interests.join(", ")
        : "general tourism";

    const prompt = `
You are a professional travel planner.

Create a detailed day-by-day itinerary for:
Destination: ${destination}
Dates: ${startDate} to ${endDate}
Travelers: ${travelers}
Budget: ${budget}
Accommodation: ${accommodation}
Interests: ${interestText}

LOCAL WEATHER FORECAST:
${weatherContext}

IMPORTANT PLANNING RULES:
1. WEATHER AWARENESS: If the forecast shows a high rain probability (>60%) or storms, prioritize indoor activities. 
2. OUTDOOR OPTIMIZATION: On clear/sunny days, prioritize outdoor landmarks.
3. CLIMATE TIPS: Include specific advice based on the temperature.
4. COMPLETENESS: Ensure the itinerary is COMPLETE.
5. STRUCTURE: Include Morning, Afternoon, and Evening plans with food suggestions and approximate daily budget.

Return in clean readable text.
`;

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1200,
      temperature: 0.7,
    });

    const plan = response.choices[0].message.content;

    if (!plan || plan.trim().length === 0) {
      throw new Error("AI returned empty itinerary");
    }

    res.json({ plan });
  } catch (error) {
    console.error("❌ AI Error:", error);
    res.status(500).json({
      error: "Failed to generate trip",
      details: error.message,
    });
  }
};

// ============================
// REFINE EXISTING ITINERARY
// ============================
const refineTrip = async (req, res) => {
  try {
    const { originalPlan, refinementPrompt } = req.body;

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
    console.error("❌ Refinement AI Error:", error);
    res.status(500).json({ error: "Failed to refine itinerary" });
  }
};

module.exports = {
  generateTrip,
  refineTrip,
};