import Crop from "../models/Crop.js";

// 🔥 Crop Recommendation
export const recommendCrop = async (req, res) => {
  try {
    const { soilType } = req.body;

    if (!soilType) {
      return res.status(400).json({ message: "Soil type required" });
    }

    // find matching crops
    const crops = await Crop.find({
      soilTypes: { $in: [soilType] },
    });

    res.json({
  recommendedCrops: crops.map(crop => ({
    name: crop.name,
    season: crop.season
  }))
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};