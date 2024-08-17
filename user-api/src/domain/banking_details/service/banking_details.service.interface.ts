export interface BankingDetailsServiceInterface {
  updateBalance(userId: string, balance: number): Promise<void>;
}
