// aiController.js

let lastIndex = -1;

export const analyzeSoil = async (req, res) => {

  try {

    // fake AI soil analysis results
    const fakeResults = [

      {
        soilType: "Loamy Soil",
        moisture: "Medium",
        fertility: "High",
        recommendedCrops: [
          "Wheat",
          "Rice",
          "Sugarcane"
        ],
        confidence: "92%",
      },

      {
        soilType: "Clay Soil",
        moisture: "High",
        fertility: "Medium",
        recommendedCrops: [
          "Rice",
          "Cotton"
        ],
        confidence: "88%",
      },

      {
        soilType: "Sandy Soil",
        moisture: "Low",
        fertility: "Low",
        recommendedCrops: [
          "Bajra",
          "Groundnut"
        ],
        confidence: "85%",
      },

      {
        soilType: "Black Soil",
        moisture: "Medium",
        fertility: "Very High",
        recommendedCrops: [
          "Cotton",
          "Maize"
        ],
        confidence: "94%",
      },

      {
        soilType: "Red Soil",
        moisture: "Low",
        fertility: "Medium",
        recommendedCrops: [
          "Jowar",
          "Groundnut"
        ],
        confidence: "87%",
      },

      {
        soilType: "Alluvial Soil",
        moisture: "High",
        fertility: "High",
        recommendedCrops: [
          "Wheat",
          "Sugarcane",
          "Rice"
        ],
        confidence: "96%",
      },

    ];

    // generate random result without repeating previous one
    let randomIndex;

    do {

      randomIndex = Math.floor(
        Math.random() * fakeResults.length
      );

    } while (randomIndex === lastIndex);

    // store current index
    lastIndex = randomIndex;

    // final AI response
    const randomAnalysis = {
      ...fakeResults[randomIndex],

      analysisId: Date.now(),

      generatedAt: new Date().toLocaleTimeString(),
    };

    // success response
    res.status(200).json({

      success: true,

      message: "AI analysis completed successfully",

      analysis: randomAnalysis,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "AI analysis failed",

      error: error.message,

    });

  }

};