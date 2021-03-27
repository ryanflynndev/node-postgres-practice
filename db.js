//sets config
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "ryanflynn",
    database: "todo_practice_database",
    host: "localhost",
    port: 5432
})

module.exports = pool;