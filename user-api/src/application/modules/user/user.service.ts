import { UserService } from "@domain/user/service/user.service";
import { Injectable } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { AppEvents } from "@shared/events.shared";

@Injectable()
export class AppUserService extends UserService {
  @EventPattern(AppEvents.USER_CREATED)
  async handleUserCreated(@Payload() data: any, @Ctx() context: any) {
    console.log(data);
    console.log(context);
  }
}
