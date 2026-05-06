import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City required" });
    }

    const apiKey = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url);

    const data = response.data;

    // clean response
    const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather[0].main,
      windSpeed: data.wind.speed,
    };

    res.json(weatherData);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};