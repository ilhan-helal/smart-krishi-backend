import User from "../models/User.js";
import Crop from "../models/Crop.js";
import axios from "axios";
import WeatherData from "../models/WeatherData.js";

export const getDashboardData = async (req, res) => {
  try {

    // logged in user
    const user = await User.findById(req.user._id);

    console.log("USER:", user);

    // 🌱 Crop Recommendation
    const crops = await Crop.find({
      states: user.location,
    });

    console.log("FOUND CROPS:", crops);
    

    // default weather object
    let weatherData = {
      city: user.location,
      temperature: "--",
      humidity: "--",
      weather: "Unavailable",
    };

    // 🌦 TRY weather fetch
try {

  const apiKey = process.env.WEATHER_API_KEY;

  // state → city map
  const stateCityMap = {
    Punjab: "Chandigarh",
    Haryana: "Chandigarh",
    Delhi: "Delhi",
    UP: "Lucknow",
    Rajasthan: "Jaipur",
    Bihar: "Patna",
  };

  // get city from state
  const city = stateCityMap[user.location];

  // weather API URL
  const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // API call
  const weatherResponse = await axios.get(weatherURL);

  weatherData = {
    city: weatherResponse.data.name,
    temperature: weatherResponse.data.main.temp,
    humidity: weatherResponse.data.main.humidity,
    weather: weatherResponse.data.weather[0].main,
  };

} catch (weatherError) {

  console.log(
    "Live Weather Failed. Using Static Weather..."
  );

  // fallback static weather
  const staticWeather =
    await WeatherData.findOne({
      state: user.location,
    });

  if (staticWeather) {

    weatherData = {
      city: user.location,
      temperature: staticWeather.temperature,
      humidity: staticWeather.humidity,
      weather: staticWeather.weather,
    };
  }
}

    // final response
    res.json({
      user: {
        name: user.name,
        location: user.location,
      },

      weather: weatherData,

      recommendedCrops: crops.map((crop) => ({
        name: crop.name,
        season: crop.season,
      })),
    });

  } catch (error) {

    console.log("Dashboard Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};