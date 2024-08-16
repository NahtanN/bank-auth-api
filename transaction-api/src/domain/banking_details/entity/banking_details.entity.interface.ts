import UserEntityInterface from "@domain/user/entity/user.entity.interface";

export interface BankingDetailsEntityInterface {
  bankingDetailsId: string;
  balance: number;
  userId: string;
  createdAt: Date;
  user?: UserEntityInterface;
}
