import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Apiary } from '../models/Apiary'

export const getApiaries = async (req: Request, res: Response) => {
  try {
    const apiaries = await Apiary.find()
    res.status(200).json(apiaries)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getApiary = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const apiary = await Apiary.findById(id)
    res.status(200).json(apiary)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const createApiary = async (req: Request, res: Response) => {
  const { apiaryName, apiaryNumber, specialNumber, editSpecialNumber } = req.body
  try {
    const apiary = await new Apiary({
      apiaryName,
      apiaryNumber, 
      specialNumber,
      editSpecialNumber
  }).save()
    res.status(201).json(apiary)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateApiary = async (req: Request, res: Response) => {
  const { id } = req.params
  const { apiaryName, apiaryNumber } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No apiary with id: ${id}`)
    }
    const apiary = await Apiary.findByIdAndUpdate(id, { apiaryName, apiaryNumber }, {new: true})
    return res.json(apiary);
}

export const deleteApiary = async (req: Request, res: Response) => {
  const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No apiary with id: ${id}`)
    }
    await Apiary.findByIdAndRemove(id);
    return res.json({ message: "Apiary deleted successfully." })
}
