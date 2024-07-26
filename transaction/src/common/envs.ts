import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_SCHEMA: string;
  DATABASE_URL: string;
  PORT: number;
  BASE_URL: string;
  KAFKA_HOST: string;
  TOPIC_ANTIFRAUD: string;
  TOPIC_TRANSACTION: string;
  CLIENT_ID: string;
  GROUP_ID: string;
}

const envSchema = joi.object({
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_NAME: joi.string().required(),
  DB_SCHEMA: joi.string().required(),
  DATABASE_URL: joi.string().required(),
  PORT: joi.number().required(),
  BASE_URL: joi.string().required(),
  KAFKA_HOST: joi.string().required(),
  TOPIC_ANTIFRAUD: joi.string().required(),
  TOPIC_TRANSACTION: joi.string().required(),
  CLIENT_ID: joi.string().required(),
  GROUP_ID: joi.string().required(),
}).unknown();

const { error, value } = envSchema.validate( process.env );

if( error ) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbName: envVars.DB_NAME,
  dbSchema: envVars.DB_SCHEMA,
  databaseUrl: envVars.DATABASE_URL,
  port: envVars.PORT,
  baseUrl: envVars.BASE_URL,
  kafkaHost: envVars.KAFKA_HOST,
  topicAntifraud: envVars.TOPIC_ANTIFRAUD,
  topicTransaction: envVars.TOPIC_TRANSACTION,
  clientId: envVars.CLIENT_ID,
  groupId: envVars.GROUP_ID,
}