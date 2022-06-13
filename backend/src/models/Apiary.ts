import mongoose, { Schema } from 'mongoose'

interface IApiary {
  apiaryName: string
  apiaryNumber: number
  specialNumber: number
  createdAt: Date
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
    specialNumber: {
      type: Number,
      default: 1
    },
  },
  {
    timestamps: true,
  }
)

export const Apiary = mongoose.model<IApiary>('Apiary', apiarySchema)