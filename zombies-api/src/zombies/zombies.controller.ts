import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateZombieDto } from "./dtos/create-zombie.dto";
import { EditZombieDto } from "./dtos/edit-zombie.dto";
import { ZombiesService } from "./zombies.service";

@Controller('zombies')
export class ZombiesController {
  constructor(private zombiesService: ZombiesService) { }

  @Get()
  getZombies() {
    return this.zombiesService.getAll();
  }

  @Get('/:id')
  getZombie(@Param('id') id: string) {
    return this.zombiesService.getById(+id);
  }

  @Post()
  addZombie(@Body() body: CreateZombieDto) {
    return this.zombiesService.add(body.zombieName, body.creationDate);
  }

  @Patch('/:id')
  editZombie(@Body() body: EditZombieDto, @Param('id') id: string) {
    console.log("I was in the controller");
    return this.zombiesService.edit(+id, body.zombieName);
  }

  @Delete('/:id')
  deleteZombie(@Param('id') id: string){
    return this.zombiesService.remove(+id);
  }
}