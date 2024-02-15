import { ENTITIES } from "../utils/constants.js"
import { entityValidation } from "../utils/validations.js"
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
        res.status(500).send({ message: error.message })
    }
}

export const entitiesController = {
    createEntity
}