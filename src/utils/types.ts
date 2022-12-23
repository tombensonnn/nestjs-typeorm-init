export type CreateUserType = {
  username: string;
  password: string;
};

export type UpdateUserType = {
  username: string;
  password: string;
};

export type CreateUserProfileType = {
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
};

export type CreateUserPostType = {
  title: string;
  description: string;
};

export type UpdateUserPostType = {
  title: string;
  description: string;
};

export type CreateUserCommentType = {
  description: string;
};
