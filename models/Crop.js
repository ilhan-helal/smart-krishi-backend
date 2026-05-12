import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  states: [String],  
  season: String,   
  waterRequirement: String,
});

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;