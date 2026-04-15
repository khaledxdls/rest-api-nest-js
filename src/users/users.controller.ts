import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Controller methods will go here
  // @get /users or /users?name=John
  @Get()
  getAllUsers(@Query('name') name: string) {
    // Logic to get all users will go here
    return this.usersService.getAllUsers(name);
  }

  // @get user by id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  // post a new user
  @Post()
  createUser(@Body() userData: { name: string; age: number }) {
    return this.usersService.createUser(userData);
  }
  // update a user
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userData: { name?: string; age?: number },
  ) {
    return this.usersService.updateUser(Number(id), userData);
  }

  // delete a user
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
