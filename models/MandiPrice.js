import mongoose from "mongoose";

const mandiPriceSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
    },

    market: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pricePerQuintal: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MandiPrice = mongoose.model("MandiPrice", mandiPriceSchema);

export default MandiPrice;