import mongoose from "mongoose"

let isConnected = false // track the connection status

const mongoDBUri = process.env.MONGODB_URI ?? ''

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  const options = {
    dbName: 'share_prompt',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  try {
    mongoose.connect(mongoDBUri, options)

    isConnected = true

    console.log('MongoDB connected')

  } catch (error) {
    console.log(error)
  }
} 