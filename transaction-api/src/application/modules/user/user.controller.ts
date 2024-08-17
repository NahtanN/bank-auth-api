import { UserServiceInterface } from "@domain/user/service/user.service.interface";
import { Controller, Get, Inject, Param, Patch } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { AppEvents } from "@shared/events.shared";
import { CurrentUser } from "src/application/decorators/current_user.decorator";

@Controller({
  version: "1",
})
export class UserController {
  constructor(
    @Inject("UserServiceInterface")
    private readonly service: UserServiceInterface,
  ) { }

  @Get()
  async getUser(@CurrentUser() id: string) {
    return this.service.getUser(id);
  }

  @Get(":id")
  async getUserById(@Param("id") id: string) {
    return this.service.getUser(id);
  }

  @Patch(":id")
  async updateUser(@Param("id") id: string) { }

  @Patch(":id/profile-picture")
  async updateProfilePicture(@Param("id") id: string) { }
}
