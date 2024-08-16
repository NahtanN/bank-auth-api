import { UserService } from "@domain/user/service/user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppUserService extends UserService { }
