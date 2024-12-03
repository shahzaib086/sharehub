/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('api_token', function (table) {
            table.increments('id');
            table.integer('user_id').nullable();
            table.string('device_id', 150);
            table.string('platform', 20);
            table.string('token', 255);
            table.string('app_version', 20).nullable();
            table.string('fcm_token', 255).nullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('api_token');
};
