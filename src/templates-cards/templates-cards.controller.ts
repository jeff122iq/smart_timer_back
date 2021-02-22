import { TemplatesCardsService } from './templates-cards.service';
import { Controller } from '@nestjs/common';

@Controller('templates-cards')
export class TemplatesCardsController {
  constructor(private readonly templatesCardsService: TemplatesCardsService) {}

}
