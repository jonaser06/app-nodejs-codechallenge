import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;


export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    printf(msg => {
      return `${JSON.stringify(msg)}`;
  })
  ),
  defaultMeta: { 
    service: 'microservice-gateway',
    memoryInMB: process.memoryUsage().rss / 1024 / 1024,
  },
  transports: [ new transports.Console() ],
  exitOnError: false
})