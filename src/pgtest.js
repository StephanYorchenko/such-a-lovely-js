const { Client } = require('pg');
const client = new Client({
	user: 'postgres',
	password: 'password',
	database: 'demo',
});

async function main() {
	await client.connect();
	const res = await client.query('SELECT * FROM aircrafts LIMIT 5;');
	for (const row of res.rows) {
		console.log(row);
	}
	// console.log(res.rows[0].message) // Hello world!
	await client.end();
}

main();

