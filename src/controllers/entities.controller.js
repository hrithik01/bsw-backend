import { ENTITIES } from "../utils/constants.js"
import { 
    entityValidation, 
    getEntitiesValidation,
    deleteEntityValidation
 } from "../utils/validations.js"
import { db } from "../index.js"

const createEntity = async (req, res) => {
    try {
        const { error } = entityValidation.validate(req.body)
        if (error) return res.status(400).send({ statusCode: 400, message: error.details[0].message })
        const { entity_name, entity_type } = req.body
        const entity_username = `${ENTITIES[entity_type]}_${entity_name.replace(/\s/g, '').toLowerCase()}`
        const entity = await db('Entity').insert({ entity_name, entity_type, entity_username }).returning('*')
        res.send({ statusCode: 200, entity })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

const getEntities = async (req, res) => {
    try {
        const { error } = getEntitiesValidation.validate(req.query)
        if (error) return res.status(400).send({ statusCode: 400, message: error.details[0].message })
        const { 
            entity_id = null, 
            entity_type = null,
            entity_username = null,
            entity_name = null 
            } = req.query
        let entities = []
        if (entity_id) 
            entities = await db('Entity').where({ entity_id })
        else if (entity_type) 
            entities = await db('Entity').where({ entity_type })
        else if (entity_username) 
            entities = await db('Entity').where({ entity_username })
        else if (entity_name)
            entities = await db('Entity').where('entity_name', 'ilike', `%${entity_name}%`)
        else 
            entities = await db('Entity').select('*')
        res.send({ statusCode: 200, entities })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

const deleteEntity = async (req, res) => {
    try {
        const { error } = deleteEntityValidation.validate(req.body)
        if (error) return res.status(400).send({ statusCode: 400, message: error.details[0].message })
        const { entity_id, entity_username } = req.body
        let deletedEntity = null
        if (entity_id) 
            deletedEntity = await db('Entity').where({ entity_id }).del().returning('*')
        else if (entity_username) 
            deletedEntity = await db('Entity').where({ entity_username }).del().returning('*')
        else 
            return res.status(400).send({ statusCode: 400, message: "You must provide either an entity_id or an entity_username" })
        if (!deletedEntity.length) return res.status(404).send({ statusCode: 404, message: "Entity not found" })
        res.send({ statusCode: 200, deletedEntity })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const entitiesController = {
    createEntity,
    getEntities,
    deleteEntity
}