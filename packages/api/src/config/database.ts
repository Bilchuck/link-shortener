import { registerAs } from '@nestjs/config';

console.log('process.env.DB_MIGRATIONS_RUN => ', process.env.DB_MIGRATIONS_RUN);
console.log('type of process.env.DB_MIGRATIONS_RUN => ', typeof process.env.DB_MIGRATIONS_RUN);
export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : void 0,
  runMigration: process.env.DB_MIGRATIONS_RUN === 'true',
}));
