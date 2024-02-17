import joi from 'joi'
import { 
    ENTITY_TYPES, 
    CREDIT_SOURCE, 
    EXPENSE_SOURCE,
    MATERIAL_TYPE,
    SERVICE_TYPE,
    UTILITY_TYPE,
    PAYMENT_MODES
  } from '../utils/constants.js'

export const entityValidation = joi.object({
    entity_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/).required(),
    entity_type: joi.string().valid(...ENTITY_TYPES).required(),
    description: joi.string().required()
})

export const getEntitiesValidation = joi.object({
    entity_id: joi.number().integer(),
    entity_type: joi.string().valid(...ENTITY_TYPES),
    entity_username: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    entity_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/)
})

export const deleteEntityValidation = joi.object({
    entity_id: joi.number().integer(),
    entity_username: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/)
})

export const createPropertyValidation = joi.object({
    property_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/).required(),
    description: joi.string().required()
})

export const getPropertyValidation = joi.object({
    property_id: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    property_name: joi.string().regex(/^[a-zA-Z0-9\s]{3,75}$/)
})

export const updatePropertyValidation = joi.object({
    description: joi.string().required()
})

export const createCreditEntryValidation = joi.object({
    amount: joi.number().integer().required(),
    source: joi.string().valid(...CREDIT_SOURCE).required(),
    payment_mode: joi.string().valid(...PAYMENT_MODES).required(),
    entity_associated: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    is_property_associated: joi.boolean().required(),
    property_associated: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    description: joi.string().required()
})

export const getCreditEntriesValidation = joi.object({
    entity_associated: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    property_associated: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    source: joi.string().valid(...CREDIT_SOURCE)
})

export const transactionIdValidation = joi.object({
    transaction_id: joi.string().regex(/^[a-zA-Z0-9]{13,16}$/)
})

export const createDebitEntryValidation = joi.object({
    amount: joi.number().integer().required(),
    source: joi.string().valid(...EXPENSE_SOURCE).required(),
    payment_mode: joi.string().valid(...PAYMENT_MODES).required(),
    entity_associated: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    is_property_associated: joi.boolean().required(),
    property_associated: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    is_bill: joi.boolean().required(),
    billed_for: joi.string().valid(...MATERIAL_TYPE, ...SERVICE_TYPE, ...UTILITY_TYPE),
    description: joi.string().required()
})

export const getDebitEntriesValidation = joi.object({
    entity_associated: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    property_associated: joi.string().regex(/^[a-zA-Z0-9_]{3,75}$/),
    source: joi.string().valid(...EXPENSE_SOURCE),
    billed_for: joi.string().valid(...MATERIAL_TYPE, ...SERVICE_TYPE, ...UTILITY_TYPE)
})