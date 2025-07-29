import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

export const dbConnect = async() => {
    await mongoose.connect(process.env.MONGODB_URI).then(
        () => console.log('DB connected successfully!')
    ).catch(err => console.log(err));
}