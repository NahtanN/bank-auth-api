import { UserServiceInterface } from "./user.service.interface";

export class UserService implements UserServiceInterface {
  async getUser(id: string) {
    return { id };
  }

  async updateUser(id: string) {
    return { id };
  }

  async updateProfilePicture(id: string) {
    return { id };
  }
}
