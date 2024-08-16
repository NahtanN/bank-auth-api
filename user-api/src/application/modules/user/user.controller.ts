import { UserServiceInterface } from "@domain/user/service/user.service.interface";
import { Controller, Get, Inject, Param, Patch } from "@nestjs/common";

@Controller({
  version: "1",
})
export class UserController {
  constructor(
    @Inject("UserServiceInterface")
    private readonly service: UserServiceInterface,
  ) { }

  @Get(":id")
  async getUser(@Param("id") id: string) { }

  @Patch(":id")
  async updateUser(@Param("id") id: string) { }

  @Patch(":id/profile-picture")
  async updateProfilePicture(@Param("id") id: string) { }
}
