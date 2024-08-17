import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BankingDetailsEntity } from "../banking_details/banking_details.typeorm.entity";

@Entity("users")
export class UserEntity implements UserEntityInterface {
  @PrimaryGeneratedColumn("uuid", {
    name: "user_id",
  })
  userId: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true })
  deletedAt?: Date;

  @OneToMany(
    () => BankingDetailsEntity,
    (bankingDetails) => bankingDetails.user,
  )
  bankingDetails: BankingDetailsEntity[];
}
