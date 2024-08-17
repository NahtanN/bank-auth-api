export interface BankingDetailRepositoryInterface {
  updateBalance(userId: string, balance: number): Promise<void>;
}
