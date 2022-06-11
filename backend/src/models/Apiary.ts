import mongoose, { Schema } from 'mongoose'

interface IApiary {
  apiaryName: string
  apiaryNumber: number
}

const apiarySchema = new Schema<IApiary>(
  {
    apiaryName: {
      type: String,
      required: true,
    },
    apiaryNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Apiary = mongoose.model<IApiary>('Apiary', apiarySchema)