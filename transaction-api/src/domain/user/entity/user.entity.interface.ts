import { BankingDetailsEntityInterface } from "@domain/banking_details/entity/banking_details.entity.interface";

export default interface UserEntityInterface {
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bankingDetails?: BankingDetailsEntityInterface[];
}
