import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  BASE_URL: string;
  KAFKA_HOST: string;
  TOPIC_ANTIFRAUD: string;
  TOPIC_TRANSACTION: string;
  CLIENT_ID: string;
  GROUP_ID: string;
}

const envSchema = joi.object({
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
  port: envVars.PORT,
  baseUrl: envVars.BASE_URL,
  kafkaHost: envVars.KAFKA_HOST,
  topicAntifraud: envVars.TOPIC_ANTIFRAUD,
  topicTransaction: envVars.TOPIC_TRANSACTION,
  clientId: envVars.CLIENT_ID,
  groupId: envVars.GROUP_ID,
}