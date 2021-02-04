import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TokenModule } from './token/token.module';
import { CardsModule } from './cards/cards.module';
import configuration from '../config/configuration';
import { BriefsModule } from './briefs/briefs.module';
import { SeedersModule } from './seeders/seeders.module';
import { TemplatesModule } from './templates/templates.module';
import { CategoriesModule } from './categories/categories.module';
import { TemplatesTagsModule } from './templates-tags/templates-tags.module';
import { CategoriesTagsModule } from './categories-tags/categories-tags.module';
import { CardsTagsModule } from './cards-tags/cards-tags.module';
import { BriefsCardsModule } from './briefs-cards/briefs-cards.module';
import { TaskModule } from './task/task.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TagsModule,
    UsersModule,
    RolesModule,
    TokenModule,
    CardsModule,
    BriefsModule,
    SeedersModule,
    TemplatesModule,
    CategoriesModule,
    TemplatesTagsModule,
    CategoriesTagsModule,
    CardsTagsModule,
    BriefsCardsModule,
    TaskModule,
  ],
})
export class AppModule {}
