/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  // Seed configurations data
  await knex('roles').insert([
    { id: 1, name: 'superadmin', slug: 'superadmin' },
    { id: 2, name: 'admin', slug: 'admin' },
    { id: 3, name: 'user', slug: 'user' },
  ]);
  
  // Seed configurations data
  await knex('divisions').insert([
    { id: 1, name: 'Division A' },
    { id: 2, name: 'Division B' },
    { id: 3, name: 'Division C' },
  ]);

};
