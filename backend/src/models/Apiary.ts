import mongoose, { Schema } from 'mongoose'

interface IApiary {
  apiaryName: string
  apiaryNumber: number
  specialNumber: number
  editSpecialNumber: boolean
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
    specialNumber: Number,
    editSpecialNumber: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

export const Apiary = mongoose.model<IApiary>('Apiary', apiarySchema)