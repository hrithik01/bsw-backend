import joi from 'joi'
import { ENTITY_TYPES } from '../utils/constants.js'

export const entityValidation = joi.object({
    entity_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/).required(),
    entity_type: joi.string().valid(...ENTITY_TYPES).required(),
    description: joi.string().required()
})

export const getEntitiesValidation = joi.object({
    entity_id: joi.number().integer(),
    entity_type: joi.string().valid(...ENTITY_TYPES),
    entity_username: joi.string().regex(/^[a-zA-Z0-9]{3,75}$/),
    entity_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/)
})

export const deleteEntityValidation = joi.object({
    entity_id: joi.number().integer(),
    entity_username: joi.string().regex(/^[a-zA-Z0-9]{3,75}$/)
})

export const createPropertyValidation = joi.object({
    property_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/).required(),
    description: joi.string().required()
})

export const getPropertyValidation = joi.object({
    property_id: joi.string().regex(/^[a-zA-Z0-9]{3,75}$/),
    property_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/)
})

export const updatePropertyValidation = joi.object({
    description: joi.string().required()
})