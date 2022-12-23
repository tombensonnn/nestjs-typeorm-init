import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/CreateUser.dto";
import { CreateUserCommentDto } from "src/users/dtos/CreateUserComment.dto";
import { CreateUserPostDto } from "src/users/dtos/CreateUserPost.dto";
import { CreateUserProfileDto } from "src/users/dtos/CreateUserProfile.dto";
import { UpdateUserDto } from "src/users/dtos/UpdateUser.dto";
import { UpdateUserPostDto } from "src/users/dtos/UpdateUserPost.dto";
import { UsersService } from "src/users/services/users/users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get(":id/posts")
  async getPostsByUser() {
    const posts = await this.userService.getAllPosts();
    return posts;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Post(":id/profile")
  createUserProfile(@Param("id", ParseIntPipe) id: number, @Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(":id/post")
  createUserPost(@Param("id", ParseIntPipe) id: number, @Body() createUserPostDto: CreateUserPostDto) {
    return this.userService.createUserPost(id, createUserPostDto);
  }

  @Put(":id/post")
  updateUserPost(@Param("id", ParseIntPipe) id: number, @Body() updateUserPostDto: UpdateUserPostDto) {
    return this.userService.updateUserPost(id, updateUserPostDto);
  }

  @Post(":userId/:postId")
  createUserComment(@Param("userId", ParseIntPipe) userId: number, @Param("postId", ParseIntPipe) postId: number, @Body() createUserCommentDto: CreateUserCommentDto) {
    return this.userService.createUserComment(userId, postId, createUserCommentDto);
  }
}
