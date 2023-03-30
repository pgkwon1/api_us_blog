import { IsNotEmpty, IsString } from "class-validator";

export default class LoginDto {
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
