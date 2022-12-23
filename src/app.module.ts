import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Comment } from "./typeorm/entities/Comment";
import { Post } from "./typeorm/entities/Post";
import { Profile } from "./typeorm/entities/Profile";
import { User } from "./typeorm/entities/User";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "canuyumaz",
      database: "nestjs_typeorm",
      entities: [User, Profile, Post, Comment],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
