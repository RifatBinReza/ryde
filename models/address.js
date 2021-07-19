const { v4: uuidv4 } = require("uuid");

module.exports = (mongoose) => {
  const addressSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuidv4(),
      },

      name: {
        type: String,
        required: true,
      },

      line1: {
        type: String,
        required: true,
      },

      line2: {
        type: String,
        required: true,
      },

      position: {
        type: { type: String },
        coordinates: [Number],
      },
    },
    {
      timestamps: true,
    }
  );

  const address = mongoose.model("Address", addressSchema);

  return address;
};
