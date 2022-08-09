import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const valid = await bcrypt.compare(pass, user.password);
    const details = await this.fetchUser(valid, user);
    return details;
  }

  async fetchUser(valid, user) {
    if (valid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      name: user.username,
      sub: user.id.toString(),
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['anonymous', 'editor'],
        'x-hasura-default-role': 'editor',
        'x-hasura-user-id': user.id.toString(),
        'x-hasura-org-id': '123',
        'x-hasura-custom': 'custom-value',
        'x-hasura-role': user.isEditor ? 'editor' : 'anonymous',
      },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createuser(args: SignupArgs) {
    return this.usersService.createuser(args);
  }
}
