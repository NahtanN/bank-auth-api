export interface BankingDetailRepositoryInterface {
  updateBalance(
    bankingDetailsId: string,
    userId: string,
    balance: number,
  ): Promise<void>;
}
