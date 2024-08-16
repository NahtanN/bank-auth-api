export default interface UserEntityInterface {
  userId: string;
  name: string;
  email: string;
  cpf: string;
  acceptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
