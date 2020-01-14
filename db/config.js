const pgp = require('pg-promise')(),
config = process.env.DATABASE_URL || 'postgres://bavilari@localhost:5432/imbdlat',
db= pgp(config);

module.exports = db;