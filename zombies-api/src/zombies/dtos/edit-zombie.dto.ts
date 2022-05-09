import { IsString } from "class-validator";

export class EditZombieDto {

  @IsString()
  zombieName: string;
}