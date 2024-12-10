/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('categories', function (table) {

        table.increments('id').primary().index();
        table.integer('parent_id').unsigned().index().nullable();
        table.string('name', 50);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    }).createTable('items', function (table) {

        table.increments('id').primary().index();
        table.integer('category_id').unsigned().index();

        table.string('title', 100);
        table.string('type', 10);
        table.double('price');
        table.string('pickup_address', 255);
        table.string('lat', 10).nullable();
        table.string('lng', 10).nullable();
        table.json('labels').nullable();
        table.tinyint('is_sold',1).defaultTo(0);
        table.tinyint('status',1).defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    }).createTable('item_images', function (table) {

        table.increments('id').primary().index();
        table.integer('item_id').unsigned().index();
        
        table.string('media_url', 100);
        table.string('type', 10);
        table.integer('sequence');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    }).createTable('user_interests', function (table) {

        table.increments('id').primary().index();
        table.integer('user_id').unsigned().index();
        table.integer('category_id').unsigned().index();
        
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('user_interests')
    .dropTableIfExists('item_images')
    .dropTableIfExists('items')
    .dropTableIfExists('categories')
};
