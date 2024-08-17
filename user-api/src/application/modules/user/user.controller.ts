import { UserServiceInterface } from "@domain/user/service/user.service.interface";
import { Body, Controller, Get, Inject, Param, Patch } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { AppEvents } from "@shared/events.shared";
import { CurrentUser } from "src/application/decorators/current_user.decorator";
import { UpdateUserDto } from "./dtos/update_user.dto";

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

  @Patch()
  async updateUser(@CurrentUser() id: string, @Body() data: UpdateUserDto) {
    return this.service.updateUser(id, data);
  }

  /*@Patch(":id/profile-picture")*/
  /*async updateProfilePicture(@Param("id") id: string) { }*/
}
