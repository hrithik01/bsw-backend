import { db } from "../index.js"
import {
    createCreditEntryValidation,
    getCreditEntriesValidation,
    transactionIdValidation,
    createDebitEntryValidation,
    getDebitEntriesValidation
} from "../utils/validations.js"

async function createCredit(req, res) {
    try {
        const { error } = createCreditEntryValidation.validate(req.body)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message }
            )
        const { amount, source, payment_mode, entity_associated, is_property_associated, property_associated, description } = req.body
        if (is_property_associated && !property_associated) return res.status(400).send(
            { statusCode: 400, message: "You must provide a property_associated to it field" }
            )
        const credit = await db('Credit').insert(
            { amount, source, payment_mode, entity_associated, is_property_associated, property_associated, description, created_at: new Date()}
            ).returning('*')
        res.send({ statusCode: 200, credit })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

async function getCreditById(req, res) {
    try {
        const { error } = transactionIdValidation.validate(req.params)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message }
            )
        const { transaction_id } = req.params
        const credit = await db('Credit').where({ transaction_id })
        if (credit.length === 0) return res.status(404).send(
            { statusCode: 404, message: 'Credit Record not found' }
            )
        res.send({ statusCode: 200, credit })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

async function deleteCreditById(req, res) {
    try {
        const { error } = transactionIdValidation.validate(req.params)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message }
            )
        const { transaction_id } = req.params
        const deletedCredit = await db('Credit').where({ transaction_id }).del().returning('*')
        if (deletedCredit.length === 0) return res.status(404).send(
            { statusCode: 404, message: 'Credit Record not found' }
            )
        res.send({ statusCode: 200, deletedCredit })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

async function createDebit(req, res) {
    try{
        const { error } = createDebitEntryValidation.validate(req.body)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message }
            )
        const { amount, source, payment_mode, entity_associated, is_property_associated, property_associated, is_bill, billed_for, description } = req.body
        if(is_bill && !billed_for) return res.status(400).send(
            { statusCode: 400, message: "You must provide a billed_for field if it is a bill" }
            )
        if(is_property_associated && !property_associated) return res.status(400).send(
            { statusCode: 400, message: "You must provide a property_associated to it field" }
            )
        const debit = await db('Debit').insert(
            { amount, source, payment_mode, entity_associated, is_property_associated, property_associated, is_bill, billed_for, description, created_at: new Date()}
            ).returning('*')
        res.send({ statusCode: 200, debit })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

async function getDebitById(req, res) {
    try {
        const { error } = transactionIdValidation.validate(req.params)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message }
            )
        const { transaction_id } = req.params
        const debit = await db('Debit').where({ transaction_id })
        if (debit.length === 0) return res.status(404).send(
            { statusCode: 404, message: 'Debit Record not found' }
            )
        res.send({ statusCode: 200, debit })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

async function deleteDebitById(req, res) {
    try {
        const { error } = transactionIdValidation.validate(req.params)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message }
            )
        const { transaction_id } = req.params
        const deletedDebit = await db('Debit').where({ transaction_id }).del().returning('*')
        if (deletedDebit.length === 0) return res.status(404).send(
            { statusCode: 404, message: 'Debit Record not found' }
            )
        res.send({ statusCode: 200, deletedDebit })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

async function getCreditEntries(req, res) {
    try {
     } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

async function getDebitEntries(req, res) {
    try {
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const paymentsController = {
    createCredit,
    getCreditById,
    getCreditEntries,
    deleteCreditById,
    createDebit,
    getDebitById,
    getDebitEntries,
    deleteDebitById
}