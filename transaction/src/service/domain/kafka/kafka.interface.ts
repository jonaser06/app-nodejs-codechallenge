export interface KafkaInterface {
  sendMessage(topic: string, messages: any[]): Promise<void>;
  consumeMessages(topic: string, handler: (message: any) => void): Promise<void>;
}