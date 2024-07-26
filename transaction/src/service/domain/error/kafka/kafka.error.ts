export class KafkaError extends Error {
  constructor(message: string = 'An error occurred while processing the Kafka message') {
    super(message);
  }
}