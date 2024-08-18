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
import { AddressEntity } from "../addresses/address.typeorm.entity";
import { BankingDetailsEntity } from "../banking_details/banking_details.typeorm.entity";

@Entity("users")
export class UserEntity implements UserEntityInterface {
  @PrimaryGeneratedColumn("uuid", {
    name: "user_id",
  })
  userId: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  email: string;

  @Column({ type: "varchar" })
  cpf: string;

  @Column({ name: "profile_picture", type: "varchar", nullable: true })
  profilePicture?: string;

  @Column({
    name: "accepted_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  acceptedAt: Date;

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

  @ManyToMany(() => AddressEntity, (address) => address.users, {
    cascade: true,
  })
  @JoinTable({
    name: "user_addresses",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "userId",
    },
    inverseJoinColumn: {
      name: "address_id",
      referencedColumnName: "addressId",
    },
  })
  address: AddressEntity[];

  @OneToMany(
    () => BankingDetailsEntity,
    (bankingDetails) => bankingDetails.user,
    {
      cascade: true,
    },
  )
  bankingDetails: BankingDetailsEntity[];
}
