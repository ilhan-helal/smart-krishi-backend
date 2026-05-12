export const analyzeSoil = async (req, res) => {

  try {

    // fake AI delay
    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    // fake AI response
    const analysisResult = {
      soilType: "Loamy Soil",
      moisture: "Medium",
      fertility: "High",

      recommendedCrops: [
        "Wheat",
        "Rice",
        "Sugarcane",
      ],

      confidence: "92%",
    };

    res.status(200).json({
      success: true,
      analysis: analysisResult,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};