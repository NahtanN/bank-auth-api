import { BankingDetailsEntityInterface } from "@domain/banking_details/entity/banking_details.entity.interface";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../user/user.typeorm.entity";

@Entity({ name: "banking_details" })
export class BankingDetailsEntity implements BankingDetailsEntityInterface {
  @PrimaryGeneratedColumn("uuid", { name: "banking_details_id" })
  bankingDetailsId: string;

  @Column({ type: "varchar" })
  account: string;

  @Column({ type: "varchar" })
  agency: string;

  @Column({ type: "int", default: 0 })
  balance: number;

  @Column({ type: "uuid", name: "user_id" })
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id", referencedColumnName: "userId" })
  user: UserEntity;

  @CreateDateColumn({
    type: "timestamp with time zone",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
