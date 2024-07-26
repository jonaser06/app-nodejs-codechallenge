export interface KafkaInterface {
  sendMessage(topic: string, messages: any[]): Promise<void>;
  consumeMessages(topic: string): Promise<any>;
}