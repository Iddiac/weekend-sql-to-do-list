// honestly i just reworte it while copying from another of my works
const pg = require('pg');

let config;
if (process.env.DATABASE_URL) {
   config = {
      // We use the DATABASE_URL from Heroku to connect to our DB
      connectionString: process.env.DATABASE_URL,
      // Heroku also requires this special `ssl` config
      ssl: { rejectUnauthorized: false },
   }
} else {
   config = {
      host: 'localhost',
      port: 5432,
      database: 'weekend-to-do-app', // CHANGE THIS LINE to match your local database name!   
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
   };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool will log when it connects to the database
pool.on('connect', () => {
   console.log('Postgesql connected');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
   console.log('Unexpected error on idle client', err);
   process.exit(-1); // unix status error code of less than 0 indicates "error" vs "successful exit" (0)
});

module.exports = pool;