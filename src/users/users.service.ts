import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  // Service methods will go here
  private users = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
  ];

  getAllUsers(name?: string) {
    if (name) {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(userData: { name: string; age: number }) {
    const newUser = {
      id: this.users.length + 1,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, userData: { name?: string; age?: number }) {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, userData);
      return user;
    }
    return null;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = this.users.splice(index, 1);
      return deletedUser[0];
    }
    return null;
  }
}
