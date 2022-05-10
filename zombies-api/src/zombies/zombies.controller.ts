import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AddItemToZombieDto } from "./dtos/add-item-to-zombie.dto";
import { CreateZombieDto } from "./dtos/create-zombie.dto";
import { EditZombieDto } from "./dtos/edit-zombie.dto";
import { ZombiesService } from "./zombies.service";

@Controller('zombies')
export class ZombiesController {
  constructor(private zombiesService: ZombiesService) { }

  @Get()
  async getZombies() {
    let result;
    try{
      result = await this.zombiesService.getAll();
    } catch (err) {
      throw Error(err);
    }
    return result;
  }

  @Get('/:id')
  async getZombie(@Param('id') id: string) {
    let result;
    try{
      result = await this.zombiesService.getById(+id);
    } catch (err) {
      throw Error(err);
    }
    return result;
  }

  @Get('/getItems/:id')
  async getItemsFromZombie(@Param('id') id: string) {
    let result;
    try{
      result = await this.zombiesService.getItemsById(+id);
    } catch (err) {
      throw Error(err);
    }
    return result;
  }

  @Get('/getItemsTotalValue/:id')
  async getZombieItemsTotalValue(@Param('id') id: string){
    let result;
    try{
      result = await this.zombiesService.getZombieItemsTotalValue(+id);
    } catch (err) {
      throw Error(err);
    }
    return result;
  }

  @Post()
  addZombie(@Body() body: CreateZombieDto) {
    return this.zombiesService.add(body.zombieName, body.creationDate);
  }

  @Post('/addItem')
  addItemToZombie(@Body() body: AddItemToZombieDto) {
    return this.zombiesService.addItemToZombie(body.zombieId, body.itemId);
  }

  @Patch('/:id')
  editZombie(@Body() body: EditZombieDto, @Param('id') id: string) {
    return this.zombiesService.edit(+id, body.zombieName);
  }

  @Delete('/:id')
  deleteZombie(@Param('id') id: string){
    let result;
    try {
      result = this.zombiesService.remove(+id);
    } catch(err) {
      throw Error(err);
    }
    return result;
  }
}