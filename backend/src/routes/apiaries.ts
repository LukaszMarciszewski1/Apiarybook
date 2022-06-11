import express from 'express'
const router = express.Router()

import {
  getApiaries,
  getApiary,
  createApiary,
  updateApiary,
  deleteApiary
} from '../controllers/apiaries'

router.get('/', getApiaries)
router.post('/', createApiary)
router.get('/:id', getApiary)
router.patch('/:id', updateApiary)
router.patch('/:id', deleteApiary)

export default router