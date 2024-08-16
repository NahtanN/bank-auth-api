import { UserServiceInterface } from "@domain/user/service/user.service.interface";
import { Controller, Get, Inject, Param, Patch } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { AppEvents } from "@shared/events.shared";

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

  @EventPattern(AppEvents.USER_CREATED)
  async handleUserCreated(@Payload() data: any, @Ctx() context: any) {
    const channel = context.getChannelRef();
    try {
      await this.service.createUser(data);
      channel.ack(context.getMessage());
    } catch (error) {
      channel.nack(context.getMessage());
    }
  }
}
