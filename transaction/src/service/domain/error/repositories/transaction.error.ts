export class TransactionError extends Error {
  constructor(message: string = 'An error occurred while processing the transaction') {
    super(message);
  }
}