import { BankingDetailRepositoryInterface } from "../repository/bankind_details.repository.interface";
import { BankingDetailsServiceInterface } from "./banking_details.service.interface";

export class BankingDetailsService implements BankingDetailsServiceInterface {
  constructor(
    private readonly bankingDetailsRepository: BankingDetailRepositoryInterface,
  ) { }

  async updateBalance(userId: string, balance: number): Promise<void> {
    return this.bankingDetailsRepository.updateBalance(userId, balance);
  }
}
