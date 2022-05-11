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
  async addZombie(@Body() body: CreateZombieDto) {
    return await this.zombiesService.add(body);
  }

  @Post('/addItem')
  async addItemToZombie(@Body() body: AddItemToZombieDto) {
    return await this.zombiesService.addItemToZombie(body);
  }

  @Patch('/:id')
  async editZombie(@Body() body: EditZombieDto, @Param('id') id: string) {
    return await this.zombiesService.edit(+id, body);
  }

  @Delete('/:id')
  async deleteZombie(@Param('id') id: string){
    let result;
    try {
      result = await this.zombiesService.remove(+id);
    } catch(err) {
      throw Error(err);
    }
    return result;
  }
}