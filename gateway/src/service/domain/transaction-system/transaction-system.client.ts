export interface TransactionSystemClient {
  getTransaction(id: string): Promise<any>;
  createTransaction(data: any): Promise<any>;
}