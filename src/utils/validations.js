import joi from 'joi'
import { ENTITY_TYPES } from '../utils/constants.js'

export const entityValidation = joi.object({
    entity_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/).required(),
    entity_type: joi.string().valid(...ENTITY_TYPES).required()
})
