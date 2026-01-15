const { Client } = require('pg');
const client = new Client({
    connectionString: "postgresql://postgres:noj7DsrYNtpDOpnP@db.zkjqyehdssxpheeceqle.supabase.co:5432/postgres?sslmode=require",
});
client.connect()
    .then(() => {
        console.log('Connected successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error', err.stack);
        process.exit(1);
    });
