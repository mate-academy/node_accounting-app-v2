import { Expose } from "class-transformer";
import { IsString } from "class-validator";

class CreateUserDto {
  @IsString()
  @Expose()
  name: string;
}

export default CreateUserDto;
