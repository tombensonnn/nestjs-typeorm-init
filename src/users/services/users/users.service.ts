import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "src/typeorm/entities/Comment";
import { Post } from "src/typeorm/entities/Post";
import { Profile } from "src/typeorm/entities/Profile";
import { User } from "src/typeorm/entities/User";
import { CreateUserCommentType, CreateUserPostType, CreateUserProfileType, CreateUserType, UpdateUserPostType, UpdateUserType } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  getAllUsers() {
    return this.userRepository.find({ relations: ["profile", "posts", "comments"] });
  }

  getAllPosts() {
    return this.postRepository.find({ relations: ["comments"] });
  }

  async createUser(user: CreateUserType) {
    const createdUser = this.userRepository.create({ ...user, createdAt: new Date() });

    return await this.userRepository.save(createdUser);
  }

  updateUser(id: number, userDetails: UpdateUserType) {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  async createUserProfile(id: number, createProfileDetails: CreateUserProfileType) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new HttpException("User not found. Cannot create profile.", HttpStatus.BAD_REQUEST);

    const newProfile = this.profileRepository.create(createProfileDetails);

    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;

    return this.userRepository.save(user);
  }

  async createUserPost(id: number, createUserPostDetails: CreateUserPostType) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new HttpException("User not found.", HttpStatus.BAD_REQUEST);

    const newPost = this.postRepository.create({ ...createUserPostDetails, createdAt: Date.now(), user });

    return await this.postRepository.save(newPost);
  }

  updateUserPost(id: number, updateUserPostDetails: UpdateUserPostType) {
    return this.postRepository.update({ id }, { ...updateUserPostDetails });
  }

  async createUserComment(userId: number, postId: number, createUserCommentDetails: CreateUserCommentType) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new HttpException("User not found.", HttpStatus.BAD_REQUEST);

    const post = await this.postRepository.findOneBy({ id: postId });

    if (!post) throw new HttpException("Post not found.", HttpStatus.BAD_REQUEST);

    const newComment = this.commentRepository.create({ ...createUserCommentDetails, user, post });

    return await this.commentRepository.save(newComment);
  }
}
