import { Role } from './../helpers/decorators/role.decorator';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';
import { TemplatesCardsService } from './templates-cards.service';
import { Controller, Post, UseGuards } from '@nestjs/common';

@Controller('templates-cards')
export class TemplatesCardsController {
  constructor(private readonly templatesCardsService: TemplatesCardsService) {}

}
