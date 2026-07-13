// Weather service - checks forecasts and alerts travelers to potential disruptions
// Uses OpenWeatherMap API
// Constantes que documentam as regras de negócio de disrupção climática.
// Centralizar aqui evita valores divergentes entre métodos diferentes.
const WEATHER_THRESHOLDS = {
    HEAVY_RAIN_PRECIPITATION_PERCENT: 70,   // % de chance de chuva considerada "forte"
    EXTREME_HEAT_CELSIUS: 38,               // temp. máxima considerada "calor extremo"
    COLD_CELSIUS: 5,                        // temp. mínima considerada "frio"
    STRONG_WIND_KMH: 30,                    // velocidade do vento considerada "forte"

    // Limiares usados para sugerir alternativas indoor (intencionalmente
    // mais sensíveis que os de disrupção, pois aqui é só uma sugestão)
    INDOOR_SUGGESTION_PRECIPITATION_PERCENT: 60,
    INDOOR_SUGGESTION_HEAT_CELSIUS: 35
};

const axios = require('axios');

class WeatherService {
    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY;
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
    }

    // Get weather forecast for the trip dates
    async getWeatherForecast(location, dates) {
        try {
            if (!this.apiKey || this.apiKey === 'your_openweather_api_key') {
                console.log('No OpenWeather API key, returning mock weather data');
                return this._getMockWeather(location, dates);
            }

            // First, get coordinates for the location
            const coords = await this._geocodeLocation(location);

            // Then fetch the forecast
            const response = await axios.get(`${this.baseURL}/forecast`, {
                params: {
                    lat: coords.lat,
                    lon: coords.lon,
                    appid: this.apiKey,
                    units: 'metric' // Celsius
                },
                timeout: 10000
            });

            // Process forecast data
            const forecast = this._processForecast(response.data, dates);
            return forecast;

        } catch (error) {
            console.error('Weather API error:', error.message);
            return this._getMockWeather(location, dates);
        }
    }

    // Convert location name to coordinates
        // Convert location name to coordinates
    async _geocodeLocation(location) {
        const response = await axios.get(`${this.baseURL}/../geo/1.0/direct`, {
            params: {
                q: location,
                limit: 1,
                appid: this.apiKey
            }
        });

        if (response.data.length > 0) {
            return {
                lat: response.data[0].lat,
                lon: response.data[0].lon
            };
        }

        throw new Error('Location not found');
    }

    // Process raw forecast data into our format
    _processForecast(data, dates) {
        const dailyForecasts = [];

        // Group forecast by day
        const forecastByDay = {};

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toISOString().split('T')[0];

            if (!forecastByDay[date]) {
                forecastByDay[date] = [];
            }

            forecastByDay[date].push(item);
        });

        // Create daily summaries
        Object.keys(forecastByDay).forEach(date => {
            const dayData = forecastByDay[date];

            // Calculate daily stats
            const temps = dayData.map(d => d.main.temp);
            const conditions = dayData.map(d => d.weather[0].main);
            const rainProb = dayData.map(d => d.pop || 0);

            dailyForecasts.push({
                date: date,
                temp: {
                    min: Math.round(Math.min(...temps)),
                    max: Math.round(Math.max(...temps)),
                    avg: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length)
                },
                condition: this._getMostCommonCondition(conditions),
                precipitation: Math.round(Math.max(...rainProb) * 100),
                description: dayData[0].weather[0].description,
                icon: dayData[0].weather[0].icon,
                windSpeed: Math.round(dayData[0].wind.speed),
                humidity: dayData[0].main.humidity
            });
        });

        return dailyForecasts;
    }

    // Find the most common weather condition for the day
    _getMostCommonCondition(conditions) {
        const counts = {};
        conditions.forEach(c => {
            counts[c] = (counts[c] || 0) + 1;
        });

        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    // Check if weather will cause disruptions
    detectWeatherDisruptions(forecast) {
        const disruptions = [];

        forecast.forEach(day => {
            const issues = [];

            if (day.precipitation > WEATHER_THRESHOLDS.HEAVY_RAIN_PRECIPITATION_PERCENT) {
                issues.push({
                    type: 'heavy_rain',
                    severity: 'moderate',
                    message: 'Heavy rain expected - consider indoor activities'
                });
            }

            if (day.temp.max > WEATHER_THRESHOLDS.EXTREME_HEAT_CELSIUS) {
                issues.push({
                    type: 'extreme_heat',
                    severity: 'high',
                    message: 'Very hot day - stay hydrated and avoid midday sun'
                });
            }

            if (day.temp.min < WEATHER_THRESHOLDS.COLD_CELSIUS) {
                issues.push({
                    type: 'cold',
                    severity: 'moderate',
                    message: 'Cold weather - pack warm clothes'
                });
            }

            if (this._isStormCondition(day.condition)) {
                issues.push({
                    type: 'storm',
                    severity: 'high',
                    message: 'Thunderstorms expected - plan indoor activities'
                });
            }

            if (day.windSpeed > WEATHER_THRESHOLDS.STRONG_WIND_KMH) {
                issues.push({
                    type: 'wind',
                    severity: 'moderate',
                    message: 'Strong winds expected'
                });
            }

            if (issues.length > 0) {
                disruptions.push({
                    date: day.date,
                    issues: issues,
                    weatherSafe: false
                });
            }
        });

        return disruptions;
    }
    // Suggest indoor alternatives for bad weather days
    suggestIndoorAlternatives(weather, originalActivity) {
        const alternatives = [];

        // If it's rainy or stormy, suggest covered activities
        if (weather.precipitation > WEATHER_THRESHOLDS.INDOOR_SUGGESTION_PRECIPITATION_PERCENT
            || this._isStormCondition(weather.condition)) {
            alternatives.push(
                { type: 'museum', suggestion: 'Visit local museums or art galleries instead', reason: 'Avoid heavy rain' },
                { type: 'indoor_market', suggestion: 'Explore covered markets or shopping centers', reason: 'Stay dry while experiencing local culture' },
                { type: 'cafe', suggestion: 'Enjoy local cafes and try regional cuisine', reason: 'Perfect rainy day activity' }
            );
        }

        // Extreme heat suggestions
        if (weather.temp.max > 35) {
            alternatives.push({
                type: 'early_morning',
                suggestion: 'Start activities early morning (before 10 AM)',
                reason: 'Avoid peak heat hours'
            });

            alternatives.push({
                type: 'water',
                suggestion: 'Plan water-based activities or visit air-conditioned places',
                reason: 'Beat the heat'
            });
        }

        return alternatives;
    }
    _isStormCondition(condition) {
    return condition.toLowerCase().includes('storm');
    }

    // Mock weather data for testing; return only the requested date range
    _getMockWeather(location, dates) {
        const forecasts = [];
        const startStr = dates.start || (Array.isArray(dates) ? dates[0] : null);
        const endStr = dates.end || (Array.isArray(dates) ? dates[dates.length - 1] : null);
        const startDate = startStr ? new Date(startStr) : new Date();
        const endDate = endStr ? new Date(endStr) : new Date(startDate);
        const dayCount = Math.max(1, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1);

        for (let i = 0; i < dayCount; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);

            forecasts.push({
                date: date.toISOString().split('T')[0],
                temp: {
                    min: 18 + Math.random() * 5,
                    max: 25 + Math.random() * 8,
                    avg: 22
                },
                condition: i === 2 ? 'Rain' : 'Clear',
                precipitation: i === 2 ? 80 : Math.round(Math.random() * 30),
                description: i === 2 ? 'moderate rain' : 'clear sky',
                icon: i === 2 ? '10d' : '01d',
                windSpeed: 10 + Math.random() * 10,
                humidity: 60 + Math.random() * 20
            });
        }

        return forecasts;
    }
}

module.exports = new WeatherService();
