module.exports = {
	HOST: process.env['POSTGRES_HOST'],
	USER: process.env['POSTGRES_USER'],
	PASSWORD: '123456',
	DB: process.env['POSTGRES_DB'],
	PORT: 5432,
	dialect: 'postgres',
};