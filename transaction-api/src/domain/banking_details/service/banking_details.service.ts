import { BankingDetailsEntityInterface } from "../entity/banking_details.entity.interface";
import { BankingDetailsRepositoryInterface } from "../repository/banking_details.repository.interface";
import { BankingDetailsServiceInterface } from "./banking_details.service.interface";

export class BankingDetailService implements BankingDetailsServiceInterface {
  constructor(
    private readonly bankingDetailsRepository: BankingDetailsRepositoryInterface,
  ) { }

  async createBankingDetails(
    data: BankingDetailsEntityInterface,
  ): Promise<void> {
    return this.bankingDetailsRepository.createBankingDetails(data);
  }
}
