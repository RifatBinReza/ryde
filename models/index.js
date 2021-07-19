const mongoose = require("mongoose");
/**
 * Connect to the database instance
 */
const connectDB = async (mongodbUrl) => {
  try {
    await mongoose.connect(mongodbUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.error(`DB Connection Error: ${err.message}`);
    throw err;
  }
};

/**
 * Get all the models for exporting
 */
const models = {
  user: require("./user")(mongoose)
};

module.exports = { connectDB, models };
