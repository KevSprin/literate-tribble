import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateItemDto } from "./dtos/create-item.dto";
import { ItemsService } from "./items.service";

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getItems() {
    return this.itemsService.getItems();
  }

  @Post()
  addItem(@Body() body: CreateItemDto) {
    return this.itemsService.addItem(body);
  }
}