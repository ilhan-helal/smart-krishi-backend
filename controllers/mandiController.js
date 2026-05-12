import MandiPrice from "../models/MandiPrice.js";
import User from "../models/User.js";

// 🌾 Get mandi prices
export const getMandiPrices = async (req, res) => {
  try {

    const { crop } = req.query;

    if (!crop) {
      return res.status(400).json({
        message: "Crop name required",
      });
    }

    // find crop prices
    const prices = await MandiPrice.find({
      cropName: {
        $regex: new RegExp(`^${crop}$`, "i"),
      },
    });

    res.json({
      crop,
      mandiPrices: prices.map((item) => ({
        market: item.market,
        state: item.state,
        pricePerQuintal: item.pricePerQuintal,
      })),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// 🌾 Get ALL mandi prices
export const getAllMandiPrices = async (req, res) => {
  try {

    // logged in user
    const user = await User.findById(req.user._id);

    // find mandi prices based on user's state
    const prices = await MandiPrice.find({
      state: user.location,
    });

    res.json({
      mandiPrices: prices.map((item) => ({
        cropName: item.cropName,
        market: item.market,
        state: item.state,
        pricePerQuintal: item.pricePerQuintal,
      })),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};