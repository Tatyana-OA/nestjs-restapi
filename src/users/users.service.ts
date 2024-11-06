import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Carol Martinez',
      email: 'carol.martinez@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Eva Green',
      email: 'eva.green@example.com',
      role: 'INTERN',
    },
    {
      id: 6,
      name: 'Frank White',
      email: 'frank.white@example.com',
      role: 'ADMIN',
    },
    {
      id: 7,
      name: 'Grace Lee',
      email: 'grace.lee@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const users = this.users.filter((user) => user.role === role);
      if (users.length > 0) {
        return users;
      } else {
        throw new NotFoundException(`No users with role ${role} found.`);
      }
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found.`);
    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
