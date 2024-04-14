import knex from "knex";

export const up = async (knex) => {
    return await knex.schema.createTable("User", (table) => {
        table.string("username").notNullable().unique().primary();
        table.string("fullname").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.timestamp("created_at", { useTz: true });
    })
}

export const down = async (knex) => {
    return await knex.schema.dropTable("User");
}
