import {  
    createPropertyValidation, 
    getPropertyValidation,
    updatePropertyValidation
 } from '../utils/validations.js'

const createProperty = async (req, res) => {
    try {
        const { error } = createPropertyValidation.validate(req.body)
        if (error) return res.status(400).send({ statusCode: 400, message: error.details[0].message })
        const { property_name, description } = req.body
        const property_id = `P_${property_name.replace(/\s/g, '').toLowerCase()}`
        const property = await db('Property').insert({ property_name, property_id, description }).returning('*')
        res.send({ statusCode: 200, property })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

const getProperties = async (req, res) => {
    try {
        const { error } = getPropertyValidation.validate(req.query)
        if (error) return res.status(400).send({ statusCode: 400, message: error.details[0].message })
        const { property_id = null, property_name = null } = req.query
        let properties = []
        if (property_id) 
            properties = await db('Property').where({ property_id })
        else if (property_name) 
            properties = await db('Property').where('property_name', 'ilike', `%${property_name}%`)
        else 
            properties = await db('Property').select('*')
        res.send({ statusCode: 200, properties })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

const updateProperty = async (req, res) => {
    try {
        const { error } = updatePropertyValidation.validate(req.body)
        if (error) return res.status(400).send({ statusCode: 400, message: error.details[0].message })
        const { property_id } = req.params
        if (!property_id) return res.status(400).send({ statusCode: 400, message: 'property_id is required' })
        const { description } = req.body
        const property = await db('Property').where({ property_id }).update({ description }).returning('*')
        res.send({ statusCode: 200, property })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

 export const propertyController = {
    createProperty,
    getProperties,
    updateProperty
 }