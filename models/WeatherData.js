import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({

  state: {
    type: String,
    required: true,
  },

  temperature: Number,

  humidity: Number,

  weather: String,
});

const WeatherData = mongoose.model(
  "WeatherData",
  weatherSchema
);

export default WeatherData;