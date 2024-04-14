import knex from "knex";

import {
  CREDIT_SOURCE,
  PAYMENT_MODES,
  EXPENSE_SOURCE,
  MATERIAL_TYPE,
  SERVICE_TYPE,
  UTILITY_TYPE,
} from "../utils/constants.js";

export const up = async (knex) => {
  return Promise.all([
    knex.schema.createTable("Credit", (table) => {
      table
        .string("transaction_id")
        .primary()
        .defaultTo(knex.raw(`to_char(now(), 'YYMMDDHH24MISSMS')`));
      table.integer("amount").notNullable();
      table.enu("source", CREDIT_SOURCE).notNullable();
      table.enu("payment_mode", PAYMENT_MODES).notNullable();
      table
        .string("entity_associated")
        .notNullable()
        .references("entity_username")
        .inTable("Entity");
      table.boolean("is_property_associated").notNullable();
      table
        .string("property_associated")
        .references("property_id")
        .inTable("Property");
      table.string("description").notNullable();
      table.timestamp("created_at", { useTz: true });
    }),
    knex.schema.createTable("Debit", (table) => {
      table
        .string("transaction_id")
        .primary()
        .defaultTo(knex.raw(`to_char(now(), 'YYMMDDHH24MISSMS')`));
      table.integer("amount").notNullable();
      table.enu("source", EXPENSE_SOURCE).notNullable();
      table.enu("payment_mode", PAYMENT_MODES).notNullable();
      table
        .string("entity_associated")
        .notNullable()
        .references("entity_username")
        .inTable("Entity");
      table.boolean("is_property_associated").notNullable();
      table
        .string("property_associated")
        .references("property_id")
        .inTable("Property");
      table.boolean("is_bill").notNullable();
      table.enu("billed_for", [
        ...MATERIAL_TYPE,
        ...SERVICE_TYPE,
        ...UTILITY_TYPE,
      ]);
      // table.boolean('is_invoice_generated').notNullable()
      // table.string('invoice_id').notNullable().references('invoice_id').inTable('Invoice')
      table.string("description").notNullable();
      table.timestamp("created_at", { useTz: true });
    }),
    // knex.schema.createTable('Invoice', (table) => {
    //     table.string('invoice_id').
    //     primary().
    //     defaultTo(knex.raw(`to_char(now(), 'YYMMDDHH24MISSMS')`))
    //     table.integer('amount').notNullable()
    //     table.enu('invoice_FOR', [...MATERIAL_TYPE, ...SERVICE_TYPE, ...UTILITY_TYPE]).notNullable()
    //     table.string('property_associated').notNullable().references('property_id').inTable('Property')
    //     table.string('entity_associated').notNullable().references('entity_username').inTable('Entity')
    //     table.string('description').notNullable()
    //     table.timestamps({ createdAt: true })
    // })
  ]);
};

export const down = async (knex) => {
  return Promise.all([
    knex.schema.dropTable("Credit"),
    knex.schema.dropTable("Debit"),
    // knex.schema.dropTable('Invoice')
  ]);
};
