import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; description: string }) {
    return this.itemsService.create(body);
  }
}
