import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from "typeorm";
import { UserEntity } from "../user/user.typeorm.entity";
import { AddressEntityInterface } from "@domain/addresses/entity/address.entity.interface";

@Entity({ name: "addresses" })
export class AddressEntity implements AddressEntityInterface {
  @PrimaryGeneratedColumn("uuid", { name: "address_id" })
  addressId: string;

  @Column({ type: "varchar", length: 10 })
  zipcode: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @Column({ type: "varchar", length: 200 })
  city: string;

  @Column({ type: "varchar", length: 255 })
  neighborhood: string;

  @Column({ type: "varchar", length: 255 })
  street: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  number: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  complement: string;

  @Column({ type: "uuid" })
  createdBy: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "created_by", referencedColumnName: "userId" })
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

  @DeleteDateColumn({
    type: "timestamp with time zone",
    name: "deleted_at",
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToMany(() => UserEntity, (user) => user.addresses)
  users: UserEntity[];
}
