import { TransactionEntityInterface } from "@domain/transaction/entity/transaction.entity.interface";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { UserEntity } from "../user/user.typeorm.entity";

@Entity("transactions")
export class TransactionEntity implements TransactionEntityInterface {
  @PrimaryGeneratedColumn("uuid", {
    name: "transaction_id",
  })
  transactionId: string;

  @Column("user_sender_id")
  userSenderId: string;

  @ManyToOne(() => UserEntity, (user) => user.sentTransactions)
  @JoinColumn({ name: "user_sender_id" })
  userSender: UserEntity;

  @Column("user_receiver_id")
  userReceiverId: string;

  @ManyToOne(() => UserEntity, (user) => user.receivedTransactions)
  @JoinColumn({ name: "user_receiver_id" })
  userReceiver: UserEntity;

  @Column({ type: "int" })
  amount: number;

  @Column({ type: "varchar" })
  description: string;

  @Column({ name: "sender_balance_before", type: "int" })
  senderBalanceBefore: number;

  @Column({ name: "sender_balance_after", type: "int" })
  senderBalanceAfter: number;

  @Column({ name: "receiver_balance_before", type: "int" })
  receiverBalanceBefore: number;

  @Column({ name: "receiver_balance_after", type: "int" })
  receiverBalanceAfter: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
    default: () => "(current_timestamp at time zone 'utc')",
  })
  createdAt: Date;
}
