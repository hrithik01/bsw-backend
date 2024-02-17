import knex from 'knex'

export const up = async (knex) => {
    return Promise.all([
        knex.schema.createTable('Property', (table) => {
                    table.string('property_id').primary().notNullable().unique()
                    table.string('property_name').notNullable()
                    table.string('description').notNullable()
        }),
        // knex.schema.createTable('Sub_property', (table) => {
        //     table.string('description').notNullable()
        // }),
    ])
}

export const down = async (knex) => {
    return Promise.all([
        knex.schema.dropTable('Property'),
        // knex.schema.dropTable('Sub_property')
    ])
}