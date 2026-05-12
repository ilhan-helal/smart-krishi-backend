import axios from "axios";

export const getAgricultureNews = async (req, res) => {

  try {

    const language = req.query.language || "en";

    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&q=agriculture%20farming%20india&language=${language}`
    );

    res.status(200).json({
      success: true,
      news: response.data.results,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};