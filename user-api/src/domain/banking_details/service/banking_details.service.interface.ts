export interface BankingDetailsServiceInterface {
  updateBalance(
    bankingDetailsId: string,
    userId: string,
    balance: number,
  ): Promise<void>;
}
