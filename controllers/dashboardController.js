import User from "../models/User.js";
import Crop from "../models/Crop.js";
import axios from "axios";

export const getDashboardData = async (req, res) => {
  try {

    // logged in user
    const user = await User.findById(req.user._id);

    // user soil type & location
    const soilType = user.soilType;
    const location = user.location;

    // 🌱 Crop Recommendation
    const crops = await Crop.find({
      soilTypes: {
        $regex: new RegExp(`^${soilType}$`, "i"),
      },
    });

    // 🌦 Weather Fetch
    const apiKey = process.env.WEATHER_API_KEY;

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    const weatherResponse = await axios.get(weatherURL);

    const weatherData = {
      city: weatherResponse.data.name,
      temperature: weatherResponse.data.main.temp,
      humidity: weatherResponse.data.main.humidity,
      weather: weatherResponse.data.weather[0].main,
    };

    // final combined response
    res.json({
      user: {
        name: user.name,
        location: user.location,
        soilType: user.soilType,
      },

      weather: weatherData,

      recommendedCrops: crops.map((crop) => ({
        name: crop.name,
        season: crop.season,
      })),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};