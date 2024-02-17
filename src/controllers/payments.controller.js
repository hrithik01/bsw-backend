import { db } from "../index.js"
import {
    createCreditEntryValidation,
    getCreditEntriesValidation,
    transactionIdValidation,
    createDebitEntryValidation,
    getDebitEntriesValidation
} from "../utils/validations.js"

async function dateToTimestamp(transaction_date) {
    const [day, month, year] = transaction_date.split('-');
    const date = new Date(year, month - 1, day);
    date.setHours(9, 0, 0, 0);
    const today = new Date();
    today.setHours(9, 0, 0, 0);
    const created_at = date.getTime() === today.getTime() ? new Date() : date;
    const now = new Date();
    if (created_at > now) {
        throw new Error('Transaction date cannot be in the future');
    }
    return created_at;
}

async function createCredit(req, res) {
    try {
        const { error } = createCreditEntryValidation.validate(req.body)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message }
            )
        const { 
            amount, source, payment_mode, entity_associated, is_property_associated, property_associated, description, transaction_date = null
         } = req.body
        if (is_property_associated && !property_associated) return res.status(400).send(
            { statusCode: 400, message: "You must provide a property_associated to it field" }
            )
        let created_at = new Date()
        if (transaction_date) {
            created_at = await dateToTimestamp(transaction_date)
        }
        const credit = await db('Credit').insert(
            { amount, source, payment_mode, entity_associated, is_property_associated, property_associated, description, created_at }
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
        const { 
            amount, source, payment_mode, entity_associated, is_property_associated, property_associated, is_bill, billed_for, description, transaction_date = null 
        } = req.body
        if(is_bill && !billed_for) return res.status(400).send(
            { statusCode: 400, message: "You must provide a billed_for field if it is a bill" }
            )
        if(is_property_associated && !property_associated) return res.status(400).send(
            { statusCode: 400, message: "You must provide a property_associated to it field" }
            )
        let created_at = new Date()
        if (transaction_date) {
            created_at = await dateToTimestamp(transaction_date)
        }
        const debit = await db('Debit').insert(
            { amount, source, payment_mode, entity_associated, is_property_associated, property_associated, is_bill, billed_for, description, created_at }
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

async function convertRelTimeToTimestamp(rel_time) {
    let fromDate;
    const toDate = new Date();

    switch (rel_time) {
        case 'last-24-hours':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 1);
            break;
        case 'last-7-days':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 7);
            break;
        case 'last-30-days':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 30);
            break;
        case 'last-90-days':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 90);
            break;
        case 'last-365-days':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 365);
            break;
        default:
            return  { statusCode: 400, message: "Invalid rel_time" }
    }
    return { fromDate, toDate }
}

async function getCreditEntries(req, res) {
    try {
        const { error } = getCreditEntriesValidation.validate(req.body)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message}
        )
        const { 
            entity_associated = null,
            property_associated = null,
            source = null,
            rel_time = null 
        } = req.body
        let { from_timestamp = null, to_timestamp = null } = req.body
        if (from_timestamp && !to_timestamp) {
            to_timestamp = new Date()
        }
        if(from_timestamp && to_timestamp && from_timestamp > to_timestamp) return res.status(400).send(
            { statusCode: 400, message: "from_timestamp must be less than to_timestamp" }
            )
        if (rel_time) {
            const { fromDate = null, toDate = null }  = await convertRelTimeToTimestamp(rel_time)
            from_timestamp = fromDate
            to_timestamp = toDate
    }
        const creditEntries = await db('Credit')
            .where(builder => {
                if(entity_associated) builder.where({ entity_associated })
                if(property_associated) builder.where({ property_associated })
                if(source) builder.where({ source })
                if(from_timestamp && to_timestamp) builder.whereBetween('created_at', [from_timestamp, to_timestamp])
            })
        if (creditEntries.length === 0) return res.status(404).send(
            { statusCode: 404, message: 'No Credit Entries found' }
            )
        let message = 'All time Entries'
        if(from_timestamp && to_timestamp) {
             message = ` Entries-: \n From- ${from_timestamp} \n to- ${to_timestamp}`
        }
        res.send({ statusCode: 200, message, creditEntries })
     } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

async function getDebitEntries(req, res) {
    try {
        const { error } = getDebitEntriesValidation.validate(req.body)
        if (error) return res.status(400).send(
            { statusCode: 400, message: error.details[0].message}
        )
        const { 
            entity_associated = null,
            property_associated = null,
            source = null,
            is_bill = null,
            billed_for = null,
            rel_time = null 
        } = req.body
        let { from_timestamp = null, to_timestamp = null } = req.body
        if (from_timestamp && !to_timestamp) {
            to_timestamp = new Date()
        }
        if(from_timestamp && to_timestamp && from_timestamp > to_timestamp) return res.status(400).send(
            { statusCode: 400, message: "from_timestamp must be less than to_timestamp" }
            )
        if (rel_time) {
            const { fromDate = null, toDate = null }  = await convertRelTimeToTimestamp(rel_time)
            from_timestamp = fromDate
            to_timestamp = toDate
        }
        const debitEntries = await db('Debit')
            .where(builder => {
                if(entity_associated) builder.where({ entity_associated })
                if(property_associated) builder.where({ property_associated })
                if(source) builder.where({ source })
                if(is_bill) builder.where({ is_bill })
                if(billed_for) builder.where({ billed_for })
                if(from_timestamp && to_timestamp) builder.whereBetween('created_at', [from_timestamp, to_timestamp])
            })
        if (debitEntries.length === 0) return res.status(404).send(
            { statusCode: 404, message: 'No Debit Entries found' }
            )
        let message = 'All time Entries'
        if(from_timestamp && to_timestamp) {
            message = ` Entries-: \n From- ${from_timestamp} \n to- ${to_timestamp}`
        }
        res.send({ statusCode: 200, message, debitEntries })
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