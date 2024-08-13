import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({
    type: "varchar",
    length: 200,
  })
  password: string;

  @Column({ type: "varchar" })
  cpf: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
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
}
