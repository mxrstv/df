import { Client } from 'pg';

export default async () => {
  const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'floormaster',
  });

  await client.connect();
  return client;
};


