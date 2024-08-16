export interface OutboxEntityInterface {
  id: number;
  eventType: string;
  payload: Record<string, any>;
  status: string;
  createdAt: Date;
}
