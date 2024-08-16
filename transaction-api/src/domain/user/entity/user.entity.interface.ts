import { BankingDetailsEntityInterface } from "@domain/banking_details/entity/banking_details.entity.interface";

export default interface UserEntityInterface {
  userId: string;
  name: string;
  email: string;
  cpf: string;
  acceptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bankingDetails?: BankingDetailsEntityInterface[];
}
