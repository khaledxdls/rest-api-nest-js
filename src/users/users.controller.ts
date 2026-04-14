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

@Controller('users')
export class UsersController {
  // Controller methods will go here
  // @get /users or /users?name=John
  @Get()
  getAllUsers(@Query('name') name: string) {
    // Logic to get all users will go here
    return 'This will return all users' + (name ? ' with name: ' + name : '');
  }

  // @get user by id
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return 'This will return a user by id: ' + id;
  }

  // post a new user
  @Post()
  createUser(@Body() userData: { name: string; age: number }) {
    return 'This will create a new user' + JSON.stringify(userData);
  }
  // update a user
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userData: { name?: string; age?: number },
  ) {
    return (
      'This will update a user with id: ' +
      id +
      ' and data: ' +
      JSON.stringify(userData)
    );
  }

  // delete a user
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return 'This will delete a user with id: ' + id;
  }
}
