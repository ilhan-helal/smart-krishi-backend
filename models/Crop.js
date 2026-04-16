import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  soilTypes: [String],   // ["loamy", "clay"]
  season: String,        // Rabi / Kharif
  waterRequirement: String,
});

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;