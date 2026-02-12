import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MONGODB Connected Successfully')
  } catch (err) {
    console.log("Error connecting to MONGODB", err)
    process.exit(1) //exit with failure
  }
}