/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function (table) {

        table.increments('id');
        table.integer('role_id');
        table.string('name', 100).nullable();
        table.string('first_name', 100).nullable();
        table.string('last_name', 100).nullable();
        table.string('email', 100).nullable().unique();
        table.string('country_code', 10).nullable();
        table.string('phone_number', 50).nullable().unique();
        table.string('password', 255).nullable();
        table.string('otp_code', 10).nullable();
        table.timestamp('otp_created_at').nullable();
        table.string('profile_image', 255).nullable();
        table.tinyint('is_email_verified',1).defaultTo(0);
        table.timestamp('email_verified_at').nullable();
        table.tinyint('is_phone_verified',1).defaultTo(0);
        table.timestamp('phone_verified_at').nullable();
        table.tinyint('status',1).defaultTo(0);
        table.tinyint('signup_step',1).defaultTo(0);
        table.tinyint('is_2fa_enable',1).defaultTo(0);
        table.string('fcm_token', 255).nullable();
        table.string('language', 10).defaultTo('en');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
