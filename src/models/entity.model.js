import knex from 'knex'
import { ENTITY_TYPES } from '../utils/constants.js'

export const up = async (knex) => {
    return await knex.schema.createTable('Entity', (table) => {
        table.increments('entity_id').primary()
        table.string('entity_name').notNullable()
        table.enu('entity_type', ENTITY_TYPES).notNullable()
        table.string('entity_username').notNullable().unique()
    })
}

export const down = async (knex) => {
    return await knex.schema.dropTable('Entity')
}
