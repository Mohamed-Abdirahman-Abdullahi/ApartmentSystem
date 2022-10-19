const mongoose = require("mongoose");
const config = require("config");

module.exports = async () => {
  try {
    await mongoose.connect(config.get("db"));
    console.log("server connected on apartments database");
  } catch (error) {
    console.log("not connected to the database", error);
  }
};
