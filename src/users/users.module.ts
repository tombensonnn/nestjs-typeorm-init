import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "src/typeorm/entities/Comment";
import { Post } from "src/typeorm/entities/Post";
import { Profile } from "src/typeorm/entities/Profile";
import { User } from "../typeorm/entities/User";
import { UsersController } from "./controller/users/users.controller";
import { UsersService } from "./services/users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Comment])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
