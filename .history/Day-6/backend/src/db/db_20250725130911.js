const mongoose = require('mongoose');

require('dotenv').config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Optional: exit the app
  }
};

module.exports = connectToDB;

