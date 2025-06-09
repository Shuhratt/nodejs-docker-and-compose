import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      /* Указываем, что токен будет передаваться в заголовке Authorization в формате Bearer <token> */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      /* Получаем секрет для подписи JWT токенов из конфигурации */
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  /**
   * Метод validate должен вернуть данные пользователя
   *
   * В JWT стратегии в качестве параметра метод получает полезную нагрузку из токена
   *
   * Вызывает у защищённых роутов, доступ req.user
   */
  async validate(jwtPayload: { username: string }) {
    const user = await this.usersService.findOne({
      where: { username: jwtPayload.username },
      select: ['id', 'email', 'username']
    });

    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return user;
  }
}
