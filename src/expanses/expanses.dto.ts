import { IsNumber, IsString } from "class-validator";

class CreateExpanseDto {
  @IsNumber()
  public id: number;

  @IsNumber()
  userId: number;

  @IsString()
  spentAt: string;

  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsString()
  note: string;
}

export default CreateExpanseDto;
