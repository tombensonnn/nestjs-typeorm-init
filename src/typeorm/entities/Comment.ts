import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity({ name: "user_comments" })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @ManyToOne(() => User, user => user.comments)
  user: User;
}
