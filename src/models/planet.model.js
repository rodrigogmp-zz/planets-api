const mongoose = require('mongoose');
const { number } = require('yup/lib/locale');

const planetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
    },
    climate: {
      type: String,
      required: true,
      trim: true,
    },
    ground: {
      type: String,
      required: true,
      trim: true
    },
    filmAppearancesAmount: {
      type: number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true,
    id: false,
    toObject: { getters: true },
    toJSON: { getters: true },
  },
);

planetSchema.methods.toJSON = function() {
  const planetRaw = this;
  return Object.fromEntries(
    Object.entries(planetRaw.toObject()),
  );
};

module.exports.Planet = mongoose.model('Planet', planetSchema);
