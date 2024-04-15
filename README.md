# BSW Backend

This is the backend for the BSW application. It provides APIs for managing entities, properties, and payments (credit and debit). All routes are protected by authentication middleware, and some routes also have additional middleware for checking access keys.


## Auth
The authentication APIs are managed through the [`auth.controller.js`](bsw-backend/src/controllers/auth.controller.js) and routes are defined in [`auth.routes.js`](bsw-backend/src/routes/auth.routes.js). The available APIs are:
- `POST /auth/signup`: Create a new user account. This API expects `email`, `fullname`, `username` and `password` in the request body. Returns `token` with user details in response.
- `POST /auth/login`: Authenticate a user and generate a token. This API expects `username` and `password` in the request body. Returns `token` in response.


## Entities

Entities are managed through the [`entities.controller.js`](bsw-backend/src/controllers/entities.controller.js) and routes are defined in [`entities.routes.js`](bsw-backend/src/routes/entities.routes.js). The available APIs are:

- `POST /entity`: Create a new entity. This API expects `entity_name`, `entity_type`, and `description` in the request body.
- `GET /entity`: Get entities. This API can filter entities based on `entity_id`, `entity_type`, `entity_username`, and `entity_name` in the request query.
- `POST /entity/delete`: Delete an entity. This API expects `entity_id` or `entity_username` in the request body.

## Properties

Properties are managed through the [`property.controller.js`](bsw-backend/src/controllers/property.controller.js) and routes are defined in [`property.routes.js`](bsw-backend/src/routes/property.routes.js). The available APIs are:

- `POST /property`: Create a new property. This API expects `property_name` and `description` in the request body.
- `GET /property`: Get properties. This API can filter properties based on `property_id` and `property_name` in the request query.
- `POST /property/update/:property_id`: Update a property. This API expects `description` in the request body.

## Payments

Payments are managed through the [`payments.controller.js`](bsw-backend/src/controllers/payments.controller.js) and routes are defined in [`payments.routes.js`](bsw-backend/src/routes/payments.routes.js). The available APIs are:

- `POST /payment/credit`: Create a new credit entry. This API expects `amount`, `source`, `payment_mode`, `entity_associated`, `is_property_associated`, `property_associated`, `transaction_date` and `description` in the request body.
- `GET /payment/credit/:transaction_id`: Get a credit entry by transaction ID.
- `GET /payment/credit/delete/:transaction_id`: Delete a credit entry by prtransaction ID.
- `POST /payment/credit/fetch`: Get credit entries. This API can filter entries based on `rel_time` in the request body.

- `POST /payment/debit`: Create a new debit entry. This API expects `amount`, `source`, `payment_mode`, `entity_associated`, `is_property_associated`, `property_associated`, `is_bill`, `billed_for`,`transaction_date` and `description` in the request body.
- `GET /payment/debit/:transaction_id`: Get a debit entry by transaction ID.
- `GET /payment/debit/delete/:transaction_id`: Delete a debit entry by transaction ID.
- `POST /payment/debit/fetch`: Get debit entries. This API can filter entries based on `rel_time` in the request body.
- `POST /payment/all-entries` : Get all entries. Entity associated can be array containing multiple entities. Generate excel can be true or false. If true, file name should be provided. 
```json
{
  "entity_associated": "entity_id",
  "property_associated": "property_id",
  "rel_time": "relative_time",
  "generate_excel": false,
  "file_name": "file_name",
  "from_timestamp": "from_timestamp",
  "to_timestamp": "to_timestamp"
}
```

- A sample timestamp `2024-02-17T19:26:57.637Z`

## Installation

To install the project, run the following command:
- First run ```npm install`` command in terminal.
- Create a deploy.sh file then run it

```sh
export PG_USERNAME=''
export PG_PASSWORD=''
export PG_HOST=''
export PG_PORT=''
export PG_DATABASE=''
export DELETE_ACCESS_KEY=''
export WRITE_ACCESS_KEY=''
export JWT_SECRET=''
# npm run start
npm run dev

```
- Run ```npx knex migrate:latest``` to create the database schema.