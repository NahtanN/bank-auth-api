import { BankingDetailsEntityInterface } from "../entity/banking_details.entity.interface";

export interface BankingDetailsRepositoryInterface {
  createBankingDetails(data: BankingDetailsEntityInterface): Promise<void>;
}
