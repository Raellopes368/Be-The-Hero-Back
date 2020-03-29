const knex = require('knex');
const { development } = require('../../knexfile');

const connection = knex(development);

module.exports = connection;
