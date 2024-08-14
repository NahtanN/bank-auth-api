export interface OutboxServiceInterface {
  emitEvents(): Promise<void>;
}
