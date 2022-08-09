import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prisma.accounts.findUnique({
      where: { username: username },
    });

    return user;
  }

  async createuser(args: SignupArgs) {
    let hash = '';
    await bcrypt.hash(args.password, 10, (err, password) => {
      console.log(password);
      this.insertUser(args.email, password);
    });
  }

  async insertUser(email, password) {
    await this.prisma.accounts.create({
      data: {
        username: email,
        password: password,
      },
    });
  }
}
