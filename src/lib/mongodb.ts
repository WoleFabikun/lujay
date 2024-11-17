// lib/mongodb.ts
import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export default connectMongo;
