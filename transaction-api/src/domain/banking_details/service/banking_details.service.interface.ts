import { BankingDetailsEntityInterface } from "../entity/banking_details.entity.interface";

export interface BankingDetailsServiceInterface {
  createBankingDetails(data: BankingDetailsEntityInterface): Promise<any>;
}
