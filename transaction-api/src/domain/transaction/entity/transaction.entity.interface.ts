export interface TransactionEntityInterface {
  transactionId: string;
  userSenderId: string;
  userSenderBankingDetailsId: string;
  userReceiverId: string;
  userReceiverBankingDetailsId: string;
  amount: number;
  description: string;
  senderBalanceBefore: number;
  senderBalanceAfter: number;
  receiverBalanceBefore: number;
  receiverBalanceAfter: number;
  createdAt: Date;
}
