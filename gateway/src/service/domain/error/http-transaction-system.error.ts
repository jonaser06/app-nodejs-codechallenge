export class HttpTransactionSystemError extends Error {
  constructor(message: string = 'Http Transaction System Client Error') {
    super(message);
  }
}