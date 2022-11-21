import { IsNumber, IsString } from "class-validator";

class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export default CreateUserDto;
